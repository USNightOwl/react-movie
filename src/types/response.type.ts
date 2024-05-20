export type SuccessResponse<Data> = {
  page: number
  results: Data
  total_pages: number
  total_results: number
}