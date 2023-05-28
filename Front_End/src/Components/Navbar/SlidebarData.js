import React from "react";

import * as AiIcons from "react-icons/ai";
import { FaLink } from 'react-icons/fa';
import { FaFont } from 'react-icons/fa';

export const SidebarData = [
  {
    title: "Home",
    path: "/index.html",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text"
  },
  {
    title: "Block Sites",
    path: "/sites",
    icon: <FaLink />,
    cName: "nav-text"
  },
  {
    title: "Block By Words",
    path: "/words",
    icon:  <FaFont />,
    cName: "nav-text"
  }
  
];
