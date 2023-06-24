import React from "react";

import * as AiIcons from "react-icons/ai";
import { FaLink } from 'react-icons/fa';
import { FaFont } from 'react-icons/fa';

export const SidebarData = [
  {
    title: "Home",
    titleAr : "الصفحة الرئيسية",
    path: "/index.html",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text"
  },
  {
    title: "Block Sites",
    titleAr : "حجب المواقع",
    path: "/sites",
    icon: <FaLink />,
    cName: "nav-text"
  },
  {
    title: "Block By Words",
    titleAr : "حجب بواسطة الكلمات",
    path: "/words",
    icon:  <FaFont />,
    cName: "nav-text"
  }
  
];
