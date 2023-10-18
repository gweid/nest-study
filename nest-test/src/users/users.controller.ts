import { Controller, Get, Post, Query, Body, Param, HttpCode, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express'
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // query 方式，通过 @Query 的装饰器取出来
  // 需要注意：这个 find 的路由要放到 :id 的路由前面
  // 因为 Nest 是从上往下匹配的，如果放在后面，会匹配到 :id 的路由
  @Get('find')
  find(@Query('name') name: string, @Query('age') age: string) {
    return this.usersService.find(name, age);
  }

  // url params 方式，通过 @Param 的装饰器取出来
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  // form urlencoded 和 json 都是从 body 取值
  // Nest 内部会根据 content type 做区分，使用不同的解析方式
  @Post()
  @HttpCode(200)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // Nest 解析 form data 使用 FilesInterceptor 的拦截器
  // 用 @UseInterceptors 装饰器启用，然后通过 @UploadedFiles 来取
  // 非文件的内容，同样是通过 @Body 来取。
  @Post('uploadfile')
  @UseInterceptors(AnyFilesInterceptor({
    dest: 'uploads/'
  }))
  uploadFile(@Body() createUserDto: CreateUserDto, @UploadedFiles() files: Express.Multer.File[]) {
    console.log(files);
    return `${JSON.stringify(createUserDto)}`
  }
}
