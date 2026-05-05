import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../config';

export const contentApi = createApi({
  reducerPath: 'contentApi',
  tagTypes: ['Hero', 'Stat', 'Service', 'Benefit', 'Gallery', 'Testimonial', 'Coverage', 'Report', 'PrintMedia'],
  baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}/api/content` }),
  endpoints: (builder) => ({
    getHero: builder.query({
      query: () => '/hero',
      providesTags: ['Hero'],
    }),
    getStats: builder.query({
      query: () => '/stats',
      providesTags: ['Stat'],
    }),
    getServices: builder.query({
      query: () => '/services',
      providesTags: ['Service'],
    }),
    getBenefits: builder.query({
      query: () => '/benefits',
      providesTags: ['Benefit'],
    }),
    getGallery: builder.query({
      query: () => '/gallery',
      providesTags: ['Gallery'],
    }),
    getTestimonials: builder.query({
      query: () => '/testimonials',
      providesTags: ['Testimonial'],
    }),
    getCoverage: builder.query({
      query: (slug) => `/coverage/${slug}`,
      providesTags: ['Coverage'],
    }),
    getReports: builder.query({
      query: () => '/reports',
      providesTags: ['Report'],
    }),
    getPrintMedia: builder.query({
      query: () => '/print-media',
      providesTags: ['PrintMedia'],
    }),
  }),
});

export const { useGetHeroQuery, useGetStatsQuery, useGetServicesQuery, useGetBenefitsQuery, useGetGalleryQuery, useGetTestimonialsQuery, useGetCoverageQuery, useGetReportsQuery, useGetPrintMediaQuery } = contentApi;
