export default interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: "Active" | "Inactive" | "Pending" | "Blacklisted";
  personalInfo: {
    fullName: string;
    bvn: number;
    gender: "Male" | "Female";
    maritalStatus: "Single" | "Married" | "Divorced";
    children: "None" | "1" | "2" | "3+";
    residence: string;
  };

  education: {
    level: "B.Sc" | "M.Sc" | "PhD";
    employmentStatus: string;
    sector: string;
    duration: string;
    officeEmail: string;
    monthlyIncome: [string, string];
    loanRepayment: number;
  };
  socials: {
    twitter: string;
    facebook: string;
    instagram: string;
  };

  guarantor: {
    fullName: string;
    phoneNumber: string;
    email: string;
    relationship: "Brother" | "Sister" | "Parent" | "Friend";
  };
}

export type UserFilter = {
  organization: string;
  username: string;
  email: string;
  dateJoined: string;
  status: User["status"] | "";
};

export const DEFAULT_FILTER: UserFilter = {
  organization: "",
  username: "",
  email: "",
  dateJoined: "",
  status: "",
};

export type SidebarLink = {
  name: string;
  icon: string;
  active?: boolean;
};

export type SidebarSection = {
  category: string;
  links: SidebarLink[];
};
