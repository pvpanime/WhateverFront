export function FoodView() {
  const { id } = useParams()
  const [pending, data, error] = useDTO<FoodViewDTO>(
    `/api/food/${id}`,
    id != undefined,
  )
  const { name, price, stock, opened, close, description } = data ?? {}
}
