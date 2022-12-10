import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from 'src/modules/features/users/users.controller';
import { UsersService } from 'src/modules/features/users/users.service';
import { UserModel } from 'src/modules/shared/database/models';
import { UserRegisterDto } from './register.dto';

describe('Users Controller', () => {
  let controller: UsersController;
  let service: UsersService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            register: jest.fn(),
            existsByUsername: jest.fn(),
            existsByEmail: jest.fn(),
          },
        },
      ],
    }).compile();
    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should throw ConflictException when username is existed ', async () => {
      const existsByUsernameSpy = jest
        .spyOn(service, 'existsByUsername')
        .mockReturnValue(Promise.resolve(true));
      const existsByEmailSpy = jest
        .spyOn(service, 'existsByEmail')
        .mockReturnValue(Promise.resolve(true));
      const saveSpy = jest
        .spyOn(service, 'registerNewUser')
        .mockReturnValue(Promise.resolve({} as UserModel));
      const responseMock = {
        location: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      } as any;
      try {
        await controller
          .register({ username: 'Bogdan101' } as UserRegisterDto, responseMock);
      } catch (e) {
        expect(e).toBeDefined();
        expect(existsByUsernameSpy).toBeCalledWith('Bogdan101');
        expect(existsByEmailSpy).toBeCalledTimes(0);
        expect(saveSpy).toBeCalledTimes(0);
      }
    });

    it('should throw ConflictException when email is existed ', async () => {
      const existsByUsernameSpy = jest
        .spyOn(service, 'existsByUsername')
        .mockReturnValue(Promise.resolve(false));
      const existsByEmailSpy = jest
        .spyOn(service, 'existsByEmail')
        .mockReturnValue(Promise.resolve(true));
      const saveSpy = jest
        .spyOn(service, 'registerNewUser')
        .mockReturnValue(Promise.resolve({} as UserModel));
      const responseMock = {
        location: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      } as any;
      try {
        await controller
          .register(
            { username: 'Bogdan101', email: 'bogdan@example.com' } as UserRegisterDto,
            responseMock,
          )
          .toPromise();
      } catch (e) {
        expect(e).toBeDefined();
        expect(existsByUsernameSpy).toBeCalledWith('Bogdan101');
        expect(existsByEmailSpy).toBeCalledWith('bogdan@example.com');
        expect(saveSpy).toBeCalledTimes(0);
      }
    });

    it('should save when username and email are available ', async () => {
      const existsByUsernameSpy = jest
        .spyOn(service, 'existsByUsername')
        .mockReturnValue(Promise.resolve(false));
      const existsByEmailSpy = jest
        .spyOn(service, 'existsByEmail')
        .mockReturnValue(Promise.resolve(false));
      const saveSpy = jest.spyOn(service, 'registerNewUser').mockReturnValue(
        Promise.resolve({
          email: 'bogdan@example.com',
          username: 'Bogdan101',
          password: 'sdfsdfs',
        } as UserModel),
      );
      const responseMock = {
        location: jest.fn().mockReturnThis(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      } as any;
      const locationSpy = jest.spyOn(responseMock, 'location');
      const statusSpy = jest.spyOn(responseMock, 'status');
      const sendSpy = jest.spyOn(responseMock, 'send');
      await controller
        .register(
          {
            email: 'bogdan@example.com',
            username: 'Bogdan101',
            password: 'sdfsdfs',
          } as UserRegisterDto,
          responseMock,
        )
        .toPromise();
      expect(existsByUsernameSpy).toBeCalledWith('Bogdan101');
      expect(existsByEmailSpy).toBeCalledWith('bogdan@example.com');
      expect(saveSpy).toBeCalledTimes(1);
      expect(locationSpy).toBeCalled();
      expect(statusSpy).toBeCalled();
      expect(sendSpy).toBeCalled();
    });
  });
});
