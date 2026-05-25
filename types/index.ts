export interface UserData {
  firstName: string;
  lastName: string;
  image: string;
  username: string;
}

export interface Tech {
  name: string;
  desc: string;
  icon: string;
  category: "language" | "framework" | "tools";
}

export interface Project {
  title: string;
  description: string;
  link: string;
  image: string;
}

export interface AboutItem {
  icon: string;
  label: string;
  value: string;
}

export interface PurposeCard {
  icon: string;
  title: string;
  desc: string;
}

export interface Contact {
  platform:  string;
  handle:    string;
  href:      string;
  icon:      string;
  iconBg:    string;
  iconColor: string;
}