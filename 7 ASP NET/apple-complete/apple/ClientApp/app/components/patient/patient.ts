
export interface Medication { 
  name: string;
}

export interface Address { 
  street: string; 
  city: string; 
}

export interface Patient {
  name: string;
  address: Address; 
  medications: Medication[];
}