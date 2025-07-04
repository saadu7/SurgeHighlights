// main interface for highlight objects
export interface Highlight {
    id: string;              // need to configure ~ 
    title: string;          
    location: string;        
    description: string;     
    createdAt: string;       // might need date-fns
  }
  
// keleton interface for creating new highlight
  export interface CreateHighlightData {
    title: string;           
    location: string;        
    description: string;     
  }