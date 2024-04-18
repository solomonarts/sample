
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

import { HiOutlineMailOpen } from "react-icons/hi";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";

export const menu = [
    { label: "Home", "link": "" },
    { label: "Products", "link": "products" },
    { label: "About", "link": "about" },
    { label: "Contact", "link": "contact" },
    // { label: "Licensing", "link": "licencing" }
]


const icon_class = "text-xl"


export
    const socials = [{ icon: <FaFacebook className={icon_class} />, link: "" },
    { icon: <FaSquareXTwitter className={icon_class} />, link: "" },
    { icon: <FaInstagram className={icon_class} />, link: "" },
    { icon: <FaLinkedin className={icon_class} />, link: "" }]

const s_icon = "text-3xl tint-color"
export const contacts = [{ icon: <HiOutlineMailOpen className={s_icon} />, label: "Send Your Email", link: "info@stellardairies.com" },
{ icon: <MdOutlinePhoneInTalk className={s_icon} />, label: "Phone Number", link: "+254 725 909717" },
{ icon: <SlLocationPin className={s_icon} />, label: "Location", link: "Nairobi, Kenya" }]
