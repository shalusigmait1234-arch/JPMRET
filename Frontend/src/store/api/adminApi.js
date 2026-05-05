import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../config';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  tagTypes: ['Inquiries', 'Hero', 'Stat', 'Service', 'Benefit', 'Gallery', 'Testimonial', 'Coverage', 'Report', 'PrintMedia'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/api/admin`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('adminToken');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getProfile: builder.query({
      query: () => '/profile',
    }),
    getDashboardStats: builder.query({
      query: () => '/stats',
      providesTags: ['Hero', 'Inquiries'],
    }),
    getInquiries: builder.query({
      query: () => '/inquiries',
      providesTags: ['Inquiries'],
    }),
    updateInquiryStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/inquiries/${id}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Inquiries'],
    }),
    getHeroes: builder.query({
      query: () => '/hero',
      providesTags: ['Hero'],
    }),
    createHero: builder.mutation({
      query: (data) => ({
        url: '/hero',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Hero'],
    }),
    updateHero: builder.mutation({
      query: ({ id, ...data }) => ({
        url: id ? `/hero/${id}` : '/hero',
        method: id ? 'PATCH' : 'POST',
        body: data,
      }),
      invalidatesTags: ['Hero'],
    }),
    deleteHero: builder.mutation({
      query: (id) => ({
        url: `/hero/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Hero'],
    }),
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: '/upload',
        method: 'POST',
        body: formData,
      }),
    }),
    getStatsList: builder.query({
      query: () => '/stats-list',
      providesTags: ['Stat'],
    }),
    saveStat: builder.mutation({
      query: (data) => ({
        url: '/stats',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Stat'],
    }),
    deleteStat: builder.mutation({
      query: (id) => ({
        url: `/stats/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Stat'],
    }),
    getServicesList: builder.query({
      query: () => '/services-list',
      providesTags: ['Service'],
    }),
    saveService: builder.mutation({
      query: (data) => ({
        url: '/services',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Service'],
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Service'],
    }),
    getBenefitsList: builder.query({
      query: () => '/benefits-list',
      providesTags: ['Benefit'],
    }),
    createBenefit: builder.mutation({
      query: (data) => ({
        url: '/benefits',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Benefit'],
    }),
    updateBenefit: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/benefits/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Benefit'],
    }),
    deleteBenefit: builder.mutation({
      query: (id) => ({
        url: `/benefits/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Benefit'],
    }),
    getGalleryList: builder.query({
      query: () => '/gallery-list',
      providesTags: ['Gallery'],
    }),
    createGalleryImage: builder.mutation({
      query: (data) => ({
        url: '/gallery',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Gallery'],
    }),
    updateGalleryImage: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/gallery/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Gallery'],
    }),
    deleteGalleryImage: builder.mutation({
      query: (id) => ({
        url: `/gallery/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Gallery'],
    }),
    getTestimonialsList: builder.query({
      query: () => '/testimonials-list',
      providesTags: ['Testimonial'],
    }),
    createTestimonial: builder.mutation({
      query: (data) => ({
        url: '/testimonials',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Testimonial'],
    }),
    updateTestimonial: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/testimonials/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Testimonial'],
    }),
    deleteTestimonial: builder.mutation({
      query: (id) => ({
        url: `/testimonials/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Testimonial'],
    }),
    upsertCoverage: builder.mutation({
      query: (data) => ({
        url: '/coverage',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Coverage'],
    }),
    getReportsList: builder.query({
      query: () => '/reports',
      providesTags: ['Report'],
    }),
    createReport: builder.mutation({
      query: (data) => ({
        url: '/reports',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Report'],
    }),
    updateReport: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/reports/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Report'],
    }),
    deleteReport: builder.mutation({
      query: (id) => ({
        url: `/reports/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Report'],
    }),
    getPrintMediaList: builder.query({
      query: () => '/print-media',
      providesTags: ['PrintMedia'],
    }),
    createPrintMedia: builder.mutation({
      query: (data) => ({
        url: '/print-media',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['PrintMedia'],
    }),
    updatePrintMedia: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/print-media/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['PrintMedia'],
    }),
    deletePrintMedia: builder.mutation({
      query: (id) => ({
        url: `/print-media/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PrintMedia'],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProfileQuery,
  useGetDashboardStatsQuery,
  useGetInquiriesQuery,
  useUpdateInquiryStatusMutation,
  useGetHeroesQuery,
  useCreateHeroMutation,
  useUpdateHeroMutation,
  useDeleteHeroMutation,
  useUploadImageMutation,
  useGetStatsListQuery,
  useSaveStatMutation,
  useDeleteStatMutation,
  useGetServicesListQuery,
  useSaveServiceMutation,
  useDeleteServiceMutation,
  useGetBenefitsListQuery,
  useCreateBenefitMutation,
  useUpdateBenefitMutation,
  useDeleteBenefitMutation,
  useGetGalleryListQuery,
  useCreateGalleryImageMutation,
  useUpdateGalleryImageMutation,
  useDeleteGalleryImageMutation,
  useGetTestimonialsListQuery,
  useCreateTestimonialMutation,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation,
  useUpsertCoverageMutation,
  useGetReportsListQuery,
  useCreateReportMutation,
  useUpdateReportMutation,
  useDeleteReportMutation,
  useGetPrintMediaListQuery,
  useCreatePrintMediaMutation,
  useUpdatePrintMediaMutation,
  useDeletePrintMediaMutation
} = adminApi;
