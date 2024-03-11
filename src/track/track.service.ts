import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TrackService {
  private tracks: Track[] = [];

  create(createTrackDto: CreateTrackDto): Track {
    const track = {
      id: uuid(),
      ...createTrackDto,
      artistId: createTrackDto.artistId ?? null,
      albumId: createTrackDto.albumId ?? null,
    };

    this.tracks.push(track);

    return track;
  }

  findAll(): Track[] {
    return this.tracks;
  }

  findOne(id: string): Track {
    const track = this.tracks.find((track) => track.id === id);

    if (!track) {
      throw new NotFoundException();
    }

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    const track = this.findOne(id);

    for (const [key, value] of Object.entries(updateTrackDto)) {
      track[key] = value;
    }

    return track;
  }

  remove(id: string): void {
    const found = this.findOne(id);
    this.tracks = this.tracks.filter((track) => track.id !== found.id);
  }

  updateAlbumIdForDeletedAlbum(id: string): void {
    this.tracks = this.tracks.map((track) => {
      console.log(track);

      if (track.albumId !== id) return track;

      return {
        ...track,
        albumId: null,
      };
    });
  }
}
