// client/api/items.js (Example: Items CRUD operations)

module.exports = async (req: any, res: any) => {
  const { method } = req

  // In a real application, you would connect to a database here.
  // This example uses an in-memory array for demonstration purposes.
  let items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
  ]

  switch (method) {
    case 'GET': // Read all items
      try {
        // debugger
        res.status(200).json(items)
      }
      catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to get items' })
      }
      break

    case 'POST': // Create a new item
      try {
        const newItem = req.body // Assuming the request body contains the new item data
        newItem.id = items.length + 1 // Simple ID generation (replace with a proper ID generation strategy)
        items.push(newItem)
        res.status(201).json(newItem) // 201 Created status
      }
      catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to create item' })
      }
      break

    case 'PUT': // Update an existing item
      try {
        const itemId = Number.parseInt(req.url.split('/').pop()) // Extract item ID from URL
        const updatedItem = req.body
        const itemIndex = items.findIndex(item => item.id === itemId)

        if (itemIndex === -1) {
          return res.status(404).json({ error: 'Item not found' })
        }

        items[itemIndex] = { ...items[itemIndex], ...updatedItem } // Update the item
        res.status(200).json(items[itemIndex])
      }
      catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to update item' })
      }
      break

    case 'DELETE': // Delete an item
      try {
        const itemId = Number.parseInt(req.url.split('/').pop())
        items = items.filter(item => item.id !== itemId)
        res.status(204).end() // 204 No Content status
      }
      catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to delete item' })
      }
      break

    default:
      res.status(405).json({ error: 'Method not allowed' }) // Handle unsupported methods
  }
}
