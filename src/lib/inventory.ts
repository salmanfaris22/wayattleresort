import { getCollection, type CollectionEntry } from 'astro:content';

/** A stay type we book across partner resorts (see src/content/rooms). */
export type Room = CollectionEntry<'rooms'>;

export async function getRooms(): Promise<Room[]> {
  return (await getCollection('rooms')).sort((a, b) => a.data.order - b.data.order);
}
