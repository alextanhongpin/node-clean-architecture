# Use Custom Errors


Custom errors makes it easier to capture more meaningful errors in the application, and also allows us to map the errors easily to REST or Graphql layers.

The core domain should not contain REST http error codes (e.g. 404 Not Found).


## Implementation

```typescript
const enum ErrorKind {
    NotFound = 'NOT_FOUND',
    Unknown = 'UNKNOWN'
}

type ErrorCode = string

abstract class AppError<T> extends Error {
    protected kind: ErrorKind = ErrorKind.Unknown
    protected code: ErrorCode = 'unknown'
    protected params: T = {} as T

    // Only works if using target ES2022?: ErrorOptions is a built-in type.
    constructor(message: string, options: ErrorOptions) {
        super(message, options)
        this.name = this.constructor.name
    }

    toJSON(): Record<string, any> {
        return {
            name: this.name,
            code: this.code,
            kind: this.kind,
            message: this.message,
            params: this.params
        }
    }
}

class UserError<T> extends AppError<T> {
    constructor(message: string, options: ErrorOptions) {
        super(message, options)
        this.code = 'user.unknown'
    }
}

class UserNotFoundError extends UserError<{ id: string }> {
    constructor(id: string, options: ErrorOptions) {
        super(`User '${id} is not found`, options)
        this.code = 'user.not_found'
        this.kind = ErrorKind.NotFound
        this.params = { id }
    }
}

const err = new Error('sql not found')
const userNotFoundErr = new UserNotFoundError('user-abc', { cause: err })

// This won't work.
const usecaseErr = new Error('usecase failed', { cause: userNotFoundErr })

console.log(userNotFoundErr)
console.log(userNotFoundErr.cause)
console.log(JSON.stringify(userNotFoundErr, null, 2))
console.log(usecaseErr instanceof UserNotFoundError)
```
