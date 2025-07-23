import React from 'react'
import { Button } from '../button'
import { Download } from 'lucide-react'

const DownloadBtn = (
    {link, text} : {link : string, text : string}
) => {
  const download = () => {
    
  }
  return (
    <a href={link} download>
        <Button className='text-white px-4 py-2 bg-primary hover:bg-primary/90' onClick={download}>
           <Download className="mr-2 h-4 w-4" /> {text}
        </Button>
    </a>
  )
}

export default DownloadBtn