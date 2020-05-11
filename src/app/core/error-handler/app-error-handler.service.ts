import {Injectable, ErrorHandler} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

import {MessageService} from 'primeng/api';

/** Application-wide error handler that adds a UI notification to the error handling
 * provided by the default Angular ErrorHandler.
 */
@Injectable()
export class AppErrorHandler extends ErrorHandler {
  constructor(private messageService: MessageService) {
    super();
  }

  handleError(error: Error | HttpErrorResponse) {
    let summary = 'An error occured.';
    let detail = 'See console for details.';

    if (error instanceof HttpErrorResponse) {
      summary = 'Network error occured.';
      detail = `${error.status}: ${error.message}`;
    } else if (error && error.message) {
      detail = error.message;
    }
    this.messageService.add({severity: 'error', summary, detail});

    super.handleError(error);
  }
}
