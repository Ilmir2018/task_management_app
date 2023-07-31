import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'src/todo/entities/connection.entity';
import { ConnectionI } from 'src/todo/todo.interface';
import { Repository } from 'typeorm';

@Injectable()
export class ConnectionService {
  constructor(
    @InjectRepository(Connection)
    private readonly connectionRepository: Repository<Connection>,
  ) {}

  async create(connection: ConnectionI): Promise<ConnectionI> {
    return await this.connectionRepository.save(connection);
  }

  async findByUserId(userId: number) {
    return this.connectionRepository.find({
      where: {
        connectedUser: {
          id: userId,
        },
      },
    });
  }

  async deleteBySocketId(socketId: string) {
    return this.connectionRepository.delete({ socketId });
  }

  async deleteAll() {
    return this.connectionRepository.createQueryBuilder().delete().execute();
  }
}
