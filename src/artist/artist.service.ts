import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  private artists: Artist[] = [];

  create(createArtistDto: CreateArtistDto): Artist {
    const artist = {
      id: uuid(),
      ...createArtistDto,
    };

    this.artists.push(artist);

    return artist;
  }

  findAll(): Artist[] {
    return this.artists;
  }

  findOne(id: string): Artist {
    const artist = this.artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new NotFoundException();
    }

    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const artist = this.findOne(id);

    for (const [key, value] of Object.entries(updateArtistDto)) {
      artist[key] = value;
    }

    return artist;
  }

  remove(id: string): void {
    const found = this.findOne(id);
    this.artists = this.artists.filter((artist) => artist.id !== found.id);
  }
}
