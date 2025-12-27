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

const RecentArticle = () => {
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
            <TableRow>
              <TableCell className="font-medium">
                Article Title
              </TableCell>

              <TableCell>
                <Badge
                  variant="secondary"
                  className="rounded-full bg-green-100 text-green-800"
                >
                  Published
                </Badge>
              </TableCell>

              <TableCell>2</TableCell>
              <TableCell>12 Feb 2025</TableCell>

              <TableCell>
                <div className="flex gap-2">
                  <Link href="/dashboard/articles">
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </Link>

                  <DeleteButton />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
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
