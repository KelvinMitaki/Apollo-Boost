import React from "react";
import { User } from "../interfaces/User";
export const UserContext = React.createContext<User | null>(null);
