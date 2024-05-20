import { Reviewer } from './user.type'

export type Review = {
  id: string
  author_details: Reviewer
  content: string
  created_at: string
  updated_at: string
}