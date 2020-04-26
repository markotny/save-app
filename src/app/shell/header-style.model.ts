export function getHeaderStyle(condition: string): unknown {
  switch (condition) {
    case 'xs':
      return {height: '50px', display: 'table-cell', 'vertical-align': 'middle', width: '100vw'};
    case 'rows-big':
      return '86px auto';
    case 'rows-small':
      return '50px auto';
    case '!xs':
      return {height: '86px', display: 'table-cell', 'vertical-align': 'middle' , width: '100vw'};
  }
}
