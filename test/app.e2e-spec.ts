import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/game/input (POST)', () => {
    const body = {
      caseNumber: 1,
      numPlayers: 3,
      diceFaces: 'LR.CCR.L.RLLLCLR.LL..R...CLR.',
    };
    request(app.getHttpServer()).post('/game/input').send(body).expect(201);
  });

  it('/game/input (GET)', () => {
    request(app.getHttpServer()).get('/game/input/id').expect(200);
  });
});
