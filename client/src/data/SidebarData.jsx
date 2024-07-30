import { FiCreditCard,  } from 'react-icons/fi';
import { BsCurrencyDollar, BsShield } from 'react-icons/bs';
import {AiFillHome} from 'react-icons/ai'
import {FaNewspaper} from 'react-icons/fa'
import {BiSolidShoppingBagAlt} from 'react-icons/bi'
import {MdLiveTv} from 'react-icons/md'
import { CgFeed } from "react-icons/cg";

import valoIcon from './icons8-valorant-50-2.png';
import csIcon from './icons8-counter-strike-logo-50.png'
import lolIcon from './icons8-league-of-legends-30.png'
import codIcon from './icons8-call-of-duty-modern-warfare-50.png'
import fifaIcon from './icons8-fifa-21-48.png'
import dotaIcon from './icons8-dota-2-30.png'

export const shop =[
  {
    title:'Apex',
    tokenname: 'Apex Coin',
    icon:'',
    price:'2500$',
  },
  {
    title:'Fornite',
    tokenname: 'V-bucks',
    icon:'',
    price:'2500$',
  },
  {
    title:'Rainbow Six Seige',
    tokenname: 'R6 credits',
    icon:'',
    price:'2500$',
  },
  {
    title:'Valorant',
    tokenname: 'Valo coin',
    icon:'',
    price:'2500$',
  },
]


export const gamedata=[
  {
    name:'Ranking'
  },
  {
    name:'Latest News'
  },
  {
    name:'Tournaments'
  },
  {
    name:'Shop'
  }
]

export const newsbar = [
  {id: 1, name: "ALL", value:"Gaming"},
  {id: 2, name: "Valorant", value:"Valorant"},
  {id: 3, name: "COD", value:"CALL OF DUTY"},
  {id: 4, name: "FIFA", value:"FiFa"},
  {id: 5, name: "Csgo", value:"CS GO"},
]

export const Ranking = [
  {id: 1, name: "Valorant", value:"Valorant"},
  {id: 2, name: "COD", value:"CALL OF DUTY"},
  {id: 3, name: "FIFA", value:"FiFa"},
  {id: 4, name: "Csgo", value:"CS GO"},
]

export const samplegamedata=[
  {
    "_id": 1,
    "title": "Valorant",
    "description": "Riot Games presents VALORANT: a 5v5 character-based tactical FPS where precise gunplay meets unique agent abilities.",
    "level": "Median",
    "category": "FPS",
    "rating": 3,
    "discount": 0.5,
    "price": 79.0,
    "img": "./src/data/Valoimg.jpg",
    "trailer": "https://www.youtube.com/embed/e_E9W2vsRbQ",
    "active": true
  },
  {
    "_id": 2,
    "title": "Call Of Duty",
    "description": "Experience classic Call of Duty® first-person combat in an all-new, massive arena for 150 players. Drop in, armor up, loot for rewards, and battle your way to the top.",
    "level": "Entry",
    "category": "FPS",
    "rating": 3,
    "discount": 0.3,
    "price": 52.56,
    "img": "./src/data/codimg.jpg",
    "trailer": "https://www.youtube.com/embed/mHDEDDrGYvo",
    "active": false
  },

  {
    "_id": 3,
    "title": "FiFa",
    "description": "Achieve European glory with your favourite club in Career Mode or the all-new standalone UEFA Champions League mode.",
    "category": "Sports",
    "rating": 4,
    "discount": 0.3,
    "price": 85.0,
    "img": "./src/data/fifa.jpg",
    "trailer": "https://www.youtube.com/embed/XhP3Xh4LMA8",
    "active": false
  },
  {
    "_id": 4,
    "title": "CS: Global Offesive",
    "description": "Play the world's number 1 online action game. Engage in an incredibly realistic brand of terrorist warfare in this wildly popular team-based game.",
    "level": "Entry",
    "category": "FPS",
    "rating": 3,
    "discount": 0.2,
    "price": 65.6,
    "img": "./src/data/csgo.jpg",
    "trailer": "https://www.youtube.com/embed/c80dVYcL69E",
    "active": false
  },

]





export const links = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'Home',
        icon: <AiFillHome className='w-6 h-6'/>,
      },
    ],
  },
];

export const games =[
  {
    title: 'Games',
    links:[
      {
        name: 'Valorant',
        // to:`game/:${name}}`,
        icon: <img src={valoIcon} alt='valo' className='invert w-6'/>,
      },
      {
        name: 'CALL OF DUTY',
        icon: <img src={codIcon} alt='cod' className='invert w-6' />,
      },
      {
        name: 'FiFa',
        icon: <img src={fifaIcon} alt='fifa' className='invert w-8 '/>,
      },
      {
        name: 'CS GO',
        icon: <img src={csIcon} alt='cs' className='invert w-7'/>,
      },
    ],
  },
]

export const Myapp=[
  {
    title: 'More',
    links: [
      {
        name: 'Latest news',
        icon: <FaNewspaper className='text-2xl' />,
      },
      {
        name: 'Shop',
        icon: <BiSolidShoppingBagAlt className='text-2xl' />,
      },
      {
        name: 'Live Steaming',
        icon: <MdLiveTv className='text-2xl' />,
      },
      {
        name: 'Memes',
        icon: <CgFeed className='text-2xl' />,
      },
    ],
  },
]

export const userProfileData = [
  {
    icon: <BsCurrencyDollar />,
    title: 'My Profile',
    desc: 'Account Settings',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
  },
  {
    icon: <BsShield />,
    title: 'My Inbox',
    desc: 'Messages & Emails',
    iconColor: 'rgb(0, 194, 146)',
    iconBg: 'rgb(235, 250, 242)',
  },
  {
    icon: <FiCreditCard />,
    title: 'My Tasks',
    desc: 'To-do and Daily Tasks',
    iconColor: 'rgb(255, 244, 229)',
    iconBg: 'rgb(254, 201, 15)',
  },
];