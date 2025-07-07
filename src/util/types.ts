export type Recording = {
  id: string;
  fileUrl: string;
  createdAt: string;
  duration: number;
};

export type Participant = {
  id: string;
  name: string;
  recordings: Recording[];
};

export type Project = {
  id: string;
  title: string;
  createdAt: string;
  endedAt: string | null;
  host_id: string;
  studio_id: string;
  participants: Participant[];
  duration?: string; 
};