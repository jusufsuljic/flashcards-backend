import { Controller, Get, Body, Post, Delete, Inject, Param, UseGuards, Req, Put, Query, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, share } from 'rxjs';
import { UpdateFlashcardRequestDto } from '../dto/update-flashcard-request-dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateFlashcardRequestDto } from 'src/dto/create-flashcard-request-dto';
import { GetSharedFlashcardsDto } from 'src/dto/get-shared-flashcards.dto';

@Controller('flashcards')
export class FlashcardsController {
    constructor(
        @Inject('FLASHCARDS') private flashcardsService: ClientProxy) {
    }

    @UseGuards(AuthGuard)
    @Post()
    public async createFlashcard(@Req() req, @Body() createFlashcardRequest: CreateFlashcardRequestDto) {
        createFlashcardRequest.userId = req?.user.sub;
        const res = await firstValueFrom(
            this.flashcardsService.send('create_flashcard', createFlashcardRequest)
        );

        return res;
    }

    @UseGuards(AuthGuard)
    @Get('share-url')
    public async generateShareUrl(@Req() req) {
        const res = await firstValueFrom(
            this.flashcardsService.send("get_share_url", req.user.sub)
        );

        return res;
    }

    @UseGuards(AuthGuard)
    @Get('shared')
    public async getSharedFlashcards(@Query() query: GetSharedFlashcardsDto) {
        const shareToken = query.sharetoken;
        console.log('shr', shareToken == '', query);

        if (shareToken == null || shareToken == '') {
            throw new HttpException("Invalid share URL.", HttpStatus.BAD_REQUEST);
        }

        const res = await firstValueFrom(
            this.flashcardsService.send("get_shared_flashcards", shareToken)
        );

        return res;
    }

    @UseGuards(AuthGuard)
    @Get(":id")
    public async getFlashcardById(@Param() id: string) {
        const res = await firstValueFrom(
            this.flashcardsService.send("get_by_id", id)
        );

        return res;
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    public async removeFlashcard(@Param() id: string) {
        await firstValueFrom(
            this.flashcardsService.send('remove_flashcard', id)
        );

        return HttpStatus.OK;
    }

    @UseGuards(AuthGuard)
    @Put()
    public async updateFlashcard(@Req() req, @Body() updateFlashcardRequest: UpdateFlashcardRequestDto) {
        updateFlashcardRequest.userId = req?.user.sub;
        const res = await firstValueFrom(
            this.flashcardsService.send('update_flashcard', updateFlashcardRequest)
        );

        return res;
    }
}


