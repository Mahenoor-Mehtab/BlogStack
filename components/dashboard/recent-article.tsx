'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import Link from 'next/link'
import { Prisma } from '@prisma/client'

type RecentArticlesProps = {
  articles: Prisma.ArticlesGetPayload<{
    include:{
      comments:true;
      author:{
    select:{
      name:true ;
      email:true;
      imageUrl:true;
    }
      }
    }
  }>[]
}

const RecentArticle : React.FC<RecentArticlesProps> = ({articles}) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Articles</CardTitle>

          <Link href="/dashboard/articles">
            <Button variant="outline">View All →</Button>
          </Link>
        </div>
      </CardHeader>

      {
        !articles.length ? <CardContent>No articles is found</CardContent>
        : 
        <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Comments</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {
              articles.map((article)=>(
                <TableRow key={article.id}>
              <TableCell className="font-medium">
             {article.title}
              </TableCell>

              <TableCell>
                <Badge
                  variant="secondary"
                  className="rounded-full bg-green-100 text-green-800"
                >
                  Published
                </Badge>
              </TableCell>

              <TableCell>{article.comments.length}</TableCell>
              <TableCell>{article.createdAt.toDateString()}</TableCell>

              <TableCell>
                <div className="flex gap-2">
                  <Link href={`/dashboard/articles/${article.id}/edit`}>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </Link>

                  <DeleteButton />
                </div>
              </TableCell>
            </TableRow>

              ))
            }
            
          </TableBody>
        </Table>
      </CardContent>

      }

      
    </Card>
  )
}

export default RecentArticle

const DeleteButton = () => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Button variant="ghost" size="sm" type="submit">
        Delete
      </Button>
    </form>
  )
}
