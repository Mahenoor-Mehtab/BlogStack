'use client'
import React, { startTransition, useActionState, type FormEvent, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '@radix-ui/react-label'
import dynamic from 'next/dynamic' // Components ko lazy + conditionally load karne ke liye
import { Button } from '../ui/button'
import 'react-quill-new/dist/quill.snow.css';
import { creatArticle } from '@/actions/create-article'
import { useRouter } from 'next/navigation'


const ReactQuill = dynamic(()=> import('react-quill-new'),{ssr:false}) // ssr:false yaha mtlb ye ki server pr load nhi hoga 

const CreateArticle = () => {
    const [content, setContent] = useState('');
    const [formState , action , isPending] = useActionState(creatArticle , {errors:{}})
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (formState.success) {
            // Reset form on success
            setContent('');
            formRef.current?.reset();
            
            // Redirect if redirectTo is provided
            if (formState.redirectTo) {
                setTimeout(() => {
                    router.push(formState.redirectTo!);
                }, 1500); // Small delay to show success message
            }
        }
    }, [formState.success, formState.redirectTo, router]);

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
        {formState.success && (
            <div className='mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md'>
                <p className='text-green-800 dark:text-green-200 text-sm font-medium'>
                    ✅ {formState.message || 'Article published successfully!'}
                </p>
            </div>
        )}
        {formState.errors.formErrors && (
            <div className='mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md'>
                <p className='text-red-800 dark:text-red-200 text-sm font-medium'>
                    {formState.errors.formErrors[0]}
                </p>
            </div>
        )}
        <form ref={formRef} onSubmit={handleSubmit} className='space-y-6'>
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
    <Input type='file' id='featuredImages' name='featuredImage' accept='image/*'>
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