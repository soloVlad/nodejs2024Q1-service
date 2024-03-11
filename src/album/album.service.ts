import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AlbumService {
  private albums: Album[] = [];

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
  }
}
