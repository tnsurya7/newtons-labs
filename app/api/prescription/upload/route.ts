import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('prescription') as File;

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: 'Invalid file type. Only JPG, PNG, and PDF allowed' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: 'File too large. Maximum size is 5MB' },
        { status: 400 }
      );
    }

    const prescriptionId = `RX${Date.now()}`;
    
    console.log('Prescription uploaded:', {
      prescriptionId,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
    });

    // Here you would:
    // 1. Upload to cloud storage (S3, Cloudinary, etc.)
    // 2. Run OCR to extract test names
    // 3. Save metadata to database
    // 4. Notify pharmacy team

    return NextResponse.json({
      success: true,
      message: 'Prescription uploaded successfully',
      data: {
        prescriptionId,
        fileName: file.name,
        fileSize: file.size,
        uploadedAt: new Date().toISOString(),
        status: 'processing',
        estimatedProcessingTime: '10-15 minutes',
        message: 'Our team will review and contact you shortly',
      },
    });
  } catch (error) {
    console.error('Prescription upload error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to upload prescription' },
      { status: 500 }
    );
  }
}
