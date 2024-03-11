import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { v4 as uuid } from 'uuid';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class AlbumService {
  private albums: Album[] = [];

  constructor(private readonly trackService: TrackService) {}

  create(createAlbumDto: CreateAlbumDto): Album {
    const album = {
      id: uuid(),
      ...createAlbumDto,
      artistId: createAlbumDto.artistId ?? null,
    };

    this.albums.push(album);

    return album;
  }

  findAll(): Album[] {
    return this.albums;
  }

  findOne(id: string): Album {
    const album = this.albums.find((album) => album.id === id);

    if (!album) {
      throw new NotFoundException();
    }

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    const album = this.findOne(id);

    for (const [key, value] of Object.entries(updateAlbumDto)) {
      album[key] = value;
    }

    return album;
  }

  remove(id: string): void {
    const found = this.findOne(id);
    this.albums = this.albums.filter((album) => album.id !== found.id);
    this.trackService.updateAlbumIdForDeletedAlbum(id);
  }

  updateArtistIdForDeletedArtist(id: string): void {
    this.albums = this.albums.map((album) => {
      if (album.artistId !== id) return album;

      return {
        ...album,
        artistId: null,
      };
    });
  }
}
