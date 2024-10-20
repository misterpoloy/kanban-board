export interface Card {
    id: string;
    content: string;
  }
  
  export interface Column {
    id: string;
    title: string;
    cards: Card[];
  }
  
  export interface Board {
    columns: Column[];
  }