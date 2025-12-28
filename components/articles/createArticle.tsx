'use client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '@radix-ui/react-label'
import dynamic from 'next/dynamic' // Components ko lazy + conditionally load karne ke liye
import { Button } from '../ui/button'
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(()=> import('react-quill-new'),{ssr:false}) // ssr:false yaha mtlb ye ki server pr load nhi hoga 

const CreateArticle = () => {
    const [content, setContent] = useState('');
  return (
    <div className='max-w-4xl mx-auto p-6'>
   <Card>
    <CardHeader>
        <CardTitle>
            Create New Article
        </CardTitle>
    </CardHeader>
    <CardContent>
        <form className='space-y-6'>
<div className='space-y-2'>
    <Input type='text' name='title' placeholder='Enter a article title'/>

</div>
<div className='space-y-2'>
    <Label>Category</Label>
    <select className='flex h-10 w-full rounded-md'>
        <option value="">Select category</option>
        <option value="technology">Technology</option>
        <option value="programming">Programming</option>
        <option value="web-development">Web development</option>
    </select>
</div>
<div className='space-y-2'>
    <Label htmlFor='featuredImages'>featured Images</Label>
    <Input type='file' id='featuredImages' name='featuredImages' accept='image/*'>
    </Input>

</div>
<div className='space-y-2'>
    <Label>Content</Label>
    <ReactQuill theme="snow" value={content} onChange={setContent} />
  


</div>
<div className='flex justify-end gap-4'>
    <Button type='submit' variant={'outline'}>Cancel</Button>
    <Button type='submit'>Publish Article</Button>
    

</div>
        </form>

    </CardContent>

   </Card>

    </div>
  )
}

export default CreateArticle