import React from 'react';

const Placeholder = ({ name }) => (
  <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-100 text-center">
    <h3 className="text-2xl font-normal text-[#013b6d] font-['DM_Serif_Display',serif] mb-4">{name} Management</h3>
    <div className="p-20 border-2 border-dashed border-gray-100 rounded-xl">
      <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Module functionality is being initialized...</p>
    </div>
  </div>
);

export const AgricultureManagementPlaceholder = () => <Placeholder name="Agriculture" />;
export const WaterManagementPlaceholder = () => <Placeholder name="Water" />;
export const EducationManagementPlaceholder = () => <Placeholder name="Education" />;
export const GalleryManagementPlaceholder = () => <Placeholder name="Photo Gallery" />;
export const PrintMediaManagementPlaceholder = () => <Placeholder name="Print Media" />;
export const ReportsManagementPlaceholder = () => <Placeholder name="Reports" />;
export const SettingsManagementPlaceholder = () => <Placeholder name="Settings" />;
