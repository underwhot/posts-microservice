import { ValidationError } from '@nestjs/common';

export class DomainError extends Error {
  constructor(errors: ValidationError[], message?: string) {
    const _error: string[] = [];
    errors.length &&
      errors.forEach((err) => {
        err?.constraints &&
          Object.entries(err.constraints).forEach((v) => {
            _error.push(v[1]);
          });
      });
    super(
      `Errors: ${_error.join('; ')} ${message ? `. Message: ${message}` : ''}`,
    );
    this.name = DomainError.name;
  }
}
