interface Playlist {
  id: number
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
  songs: number[]
}

export type { Playlist }
