import { CalendarPlus, CircleDot, File, Folders, Home, Video } from 'lucide-react'


export const page = [
    {
        name: 'Home',
        href: '/dashboard/home',
        icon : Home
    },
    {
        name: 'Studio',
        href: '/dashboard/studio',
        icon : Video,
    },
    {
        name: 'Projects',
        href: '/dashboard/projects',
        icon : File
    }
]

export const studio = [
    {
        name: 'Record',
        href: '/dashboard/studio/home',
        icon : CircleDot
    },
    {
        name : 'Projects',
        href : '/dashboard/projects',
        icon : Folders
    },
    {
        name : 'Schedule',
        href : '/dashboard/schedule',
        icon : CalendarPlus
    }
]