'use client'
import React, { startTransition, useActionState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '@radix-ui/react-label'
import dynamic from 'next/dynamic' // Components ko lazy + conditionally load karne ke liye
import { Button } from '../ui/button'
import 'react-quill-new/dist/quill.snow.css';
import { creatArticle } from '@/actions/create-article'

const ReactQuill = dynamic(()=> import('react-quill-new'),{ssr:false}) // ssr:false yaha mtlb ye ki server pr load nhi hoga 

const CreateArticle = () => {
    const [content, setContent] = useState('');
    const [formState , action , isPending] = useActionState(creatArticle , {errors:{}})

    const handleSubmit = async (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        formData.append("content", content)
        startTransition(()=>{
            action(formData)
        })

    }

  return (
    <div className='max-w-4xl mx-auto p-6'>
   <Card>
    <CardHeader>
        <CardTitle>
            Create New Article
        </CardTitle>
    </CardHeader>
    <CardContent>
        <form  onSubmit={handleSubmit} className='space-y-6'>
<div className='space-y-2'>
    <Input type='text' name='title' placeholder='Enter a article title'/>
    {formState.errors.title && <span className='text-red-600 text-sm'> {formState.errors.title}</span>}

</div>
<div className='space-y-2'>
    <Label>Category</Label>
    <select className='flex h-10 w-full rounded-md bg-background' name='category' id='category'>
        <option value="">Select category</option>
        <option value="technology">Technology</option>
        <option value="programming">Programming</option>
        <option value="web-development">Web development</option>
    </select>
     {formState.errors.category&& <span className='text-red-600 text-sm'> {formState.errors.category}</span>}
</div>
<div className='space-y-2'>
    <Label htmlFor='featuredImages'>featured Images</Label>
    <Input type='file' id='featuredImages' name='featuredImages' accept='image/*'>
    </Input>

</div>
<div className='space-y-2'>
    <Label>Content</Label>
    <ReactQuill theme="snow" value={content} onChange={setContent}/>
   {formState.errors.content && <span className='text-red-600 text-sm'> {formState.errors.content[0]}</span>}


</div>
<div className='flex justify-end gap-4'>
    <Button type='submit' variant={'outline'}>Cancel</Button>
    <Button type='submit' disabled={isPending}>
        {
            isPending?"LOADING":"Publish Article"
        }
    </Button>
    

</div>
        </form>

    </CardContent>

   </Card>

    </div>
  )
}

export default CreateArticle