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
    this.messageService.add({severity: 'error', summary: 'An error occured.', detail: 'See console for details.'});

    super.handleError(error);
  }
}
