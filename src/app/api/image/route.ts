import { CODE_SUCCESS, COOKIE_KEY_ACCESS_TOKEN, SERVER_BASE_URL, SERVER_DEFAULT_HOST } from '@/constants';
import { NextRequest, NextResponse } from 'next/server';
import stream from 'stream';
import nodeFetch from 'node-fetch';
import FormData from 'form-data';
import { cookies, headers } from 'next/headers';

export async function POST(request: NextRequest) {
  const image = (await request.formData()).get('image') as File;
  const formData = new FormData();
  const currentCookies = cookies();

  formData.append('image', stream.Readable.from(Buffer.from(await image.arrayBuffer())), image.name);

  const result = await nodeFetch(SERVER_BASE_URL + '/config/imageUpload', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      authorization: currentCookies.get(COOKIE_KEY_ACCESS_TOKEN)?.value ?? '',
      Host: headers().get('host') ?? SERVER_DEFAULT_HOST,
      ...formData.getHeaders(),
    },
    body: formData,
  });

  const data: any = await result.json();

  if (data.code !== CODE_SUCCESS) {
    return new NextResponse(null, { status: 500, statusText: data.message });
  } else {
    return NextResponse.json(data);
  }
}
