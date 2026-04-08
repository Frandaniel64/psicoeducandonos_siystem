import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SubscribeNewsletterDto } from './dto/subscribe-newsletter.dto';
import { PublicService } from './public.service';

@Controller('public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Get('blog/featured')
  getFeaturedBlogPosts() {
    return this.publicService.getFeaturedBlogPosts();
  }

  @Get('footer-links')
  getFooterLinks() {
    return this.publicService.getFooterLinks();
  }

  @HttpCode(HttpStatus.OK)
  @Post('newsletter/subscribe')
  subscribeToNewsletter(@Body() subscribeDto: SubscribeNewsletterDto) {
    return this.publicService.subscribeToNewsletter(subscribeDto);
  }
}
