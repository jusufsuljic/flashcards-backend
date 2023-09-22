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

    /**
     * Creates a new flashcard by sending a 'create_flashcard' message to the flashcards service.
     * @param {Request} req - The request object containing user information.
     * @param {CreateFlashcardRequestDto} createFlashcardRequest - The request body containing the flashcard data.
     * @returns A Promise that resolves to the response from the flashcards service.
     * @throws {UnauthorizedException} If the user is not authenticated.
     */
    @UseGuards(AuthGuard)
    @Post()
    public async createFlashcard(@Req() req, @Body() createFlashcardRequest: CreateFlashcardRequestDto) {
        createFlashcardRequest.userId = req?.user.sub;
        const res = await firstValueFrom(
            this.flashcardsService.send('create_flashcard', createFlashcardRequest)
        );

        return res;
    }

    /**
     * Generates a share URL for the authenticated user.
     * @param {Request} req - The request object containing user information.
     * @returns {Promise<string>} - A promise that resolves to the generated share URL.
     * @throws {Error} - If there is an error while generating the share URL.
     */
    @UseGuards(AuthGuard)
    @Get('share-url')
    public async generateShareUrl(@Req() req) {
        const res = await firstValueFrom(
            this.flashcardsService.send("get_share_url", req.user.sub)
        );

        return res;
    }

    /**
     * Retrieves shared flashcards based on the provided share token.
     * @param {GetSharedFlashcardsDto} query - The query object containing the share token.
     * @returns {Promise<any>} - A promise that resolves to the shared flashcards.
     * @throws {HttpException} - Throws an exception if the share token is invalid or empty.
     */
    @UseGuards(AuthGuard)
    @Get('shared')
    public async getSharedFlashcards(@Query() query: GetSharedFlashcardsDto) {
        const shareToken = query.sharetoken;

        if (shareToken == null || shareToken == '') {
            throw new HttpException("Invalid share URL.", HttpStatus.BAD_REQUEST);
        }

        const res = await firstValueFrom(
            this.flashcardsService.send("get_shared_flashcards", shareToken)
        );

        return res;
    }

    /**
     * Retrieves a flashcard by its ID.
     * @param {string} id - The ID of the flashcard to retrieve.
     * @returns {Promise<any>} - A promise that resolves to the flashcard object.
     * @throws {Error} - If there was an error retrieving the flashcard.
     */
    @UseGuards(AuthGuard)
    @Get(":id")
    public async getFlashcardById(@Param() id: string) {
        const res = await firstValueFrom(
            this.flashcardsService.send("get_by_id", id)
        );

        return res;
    }

    /**
     * Removes a flashcard with the specified ID.
     * @param {string} id - The ID of the flashcard to remove.
     * @returns {Promise<HttpStatus>} - A promise that resolves to the HTTP status code indicating the success of the operation.
     * @throws {Error} - If an error occurs during the removal process.
     */
    @UseGuards(AuthGuard)
    @Delete(':id')
    public async removeFlashcard(@Param() id: string) {
        await firstValueFrom(
            this.flashcardsService.send('remove_flashcard', id)
        );

        return HttpStatus.OK;
    }

    /**
     * Updates a flashcard with the provided data.
     * @param {Request} req - The request object.
     * @param {UpdateFlashcardRequestDto} updateFlashcardRequest - The data to update the flashcard with.
     * @returns {Promise<any>} - A promise that resolves to the updated flashcard.
     * @throws {UnauthorizedException} - If the user is not authenticated.
     */
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


