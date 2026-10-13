// ============================================================
// photos.js - YOUR PHOTO LIST. This is the only file you edit to add photos.
//
// HOW TO ADD A PHOTO
//  1. Crop it to a square (for example 1400 x 1400 pixels).
//  2. Save a big copy in   assets/images/full/    e.g. 001.jpg
//     and a small copy (about 480 x 480) in  assets/images/thumbs/  with the SAME name.
//     (If you skip the small copy, the big one is used. It just loads slower.)
//  3. Add one line to the list below:
//        { file: "001.jpg", alt: "What the photo shows", caption: "", date: "", note: "" },
//
//  file     REQUIRED. The exact file name, including .jpg / .png / .webp
//  alt      Describes the photo for screen readers. Keep it short and plain.
//  caption  Optional handwritten text under the photo.
//  date     Optional, shown small under the caption.
//  note     Optional longer note, shown only in the big view.
//
// The photos appear in the order listed. Put commas at the end of each line.
// The six lines below are SAMPLES. Delete them when you add your real photos.
// ============================================================

export const IMAGE_FOLDER = "PHOTOS/";

export const PHOTOS = [
  { file: "1725268195393.jpg", alt: "Photo 1", caption: "", date: "", note: "" },
  { file: "1725275807403_1.jpg", alt: "Photo 2", caption: "", date: "", note: "" },
  { file: "IMG_20241004_101952_070.jpg", alt: "Photo 3", caption: "", date: "", note: "" },
  { file: "IMG_20241004_110334_420.jpg", alt: "Photo 4", caption: "", date: "", note: "" },
  { file: "IMG_20241004_110347_798.jpg", alt: "Photo 5", caption: "", date: "", note: "" },
  { file: "IMG_20241214_201958_207.jpg", alt: "Photo 6", caption: "", date: "", note: "" },
  { file: "IMG_20241214_202010_624.jpg", alt: "Photo 7", caption: "", date: "", note: "" },
  { file: "IMG_20241220_204737_172.jpg", alt: "Photo 8", caption: "", date: "", note: "" },
  { file: "IMG_20241228_185506_617.jpg", alt: "Photo 9", caption: "", date: "", note: "" },
  { file: "IMG_20241228_185509_306.jpg", alt: "Photo 10", caption: "", date: "", note: "" },
  { file: "IMG_20241228_190318_039.jpg", alt: "Photo 11", caption: "", date: "", note: "" },
  { file: "IMG_20241228_190321_176.jpg", alt: "Photo 12", caption: "", date: "", note: "" },
  { file: "IMG_20250204_110405_298.jpg", alt: "Photo 13", caption: "", date: "", note: "" },
  { file: "IMG_20250316_185103_546.jpg", alt: "Photo 14", caption: "", date: "", note: "" },
  { file: "IMG_20250316_185107_292.jpg", alt: "Photo 15", caption: "", date: "", note: "" },
  { file: "IMG_20250316_185108_978.jpg", alt: "Photo 16", caption: "", date: "", note: "" },
  { file: "IMG_20250316_185110_729.jpg", alt: "Photo 17", caption: "", date: "", note: "" },
  { file: "IMG_20250414_183923_536.jpg", alt: "Photo 18", caption: "", date: "", note: "" },
  { file: "IMG_20250414_183925_404.jpg", alt: "Photo 19", caption: "", date: "", note: "" },
  { file: "IMG_20250414_191552_816.jpg", alt: "Photo 20", caption: "", date: "", note: "" },
  { file: "IMG_20250414_191629_506.jpg", alt: "Photo 21", caption: "", date: "", note: "" },
  { file: "IMG_20250520_164025_996.jpg", alt: "Photo 22", caption: "", date: "", note: "" },
  { file: "IMG_20250614_170023_258.jpg", alt: "Photo 23", caption: "", date: "", note: "" },
  { file: "IMG_20250614_170031_639.jpg", alt: "Photo 24", caption: "", date: "", note: "" },
  { file: "IMG_20251214_162133_950.jpg", alt: "Photo 25", caption: "", date: "", note: "" },
  { file: "IMG_20260108_145303.jpg", alt: "Photo 26", caption: "", date: "", note: "" },
  { file: "IMG_20260111_144710.jpg", alt: "Photo 30", caption: "", date: "", note: "" },
  { file: "IMG_20260118_132506.jpg", alt: "Photo 31", caption: "", date: "", note: "" },
  { file: "Messenger_creation_01F2BB77-5D6E-47ED-8781-07C3D91699AB~2.jpeg", alt: "Photo 32", caption: "", date: "", note: "" },
  { file: "Messenger_creation_12AD9F04-57C4-4CC8-B2EB-EB1C9F317387.jpeg", alt: "Photo 33", caption: "", date: "", note: "" },
  { file: "Messenger_creation_12B3D344-155E-409C-AE04-E0B49F726973.jpeg", alt: "Photo 34", caption: "", date: "", note: "" },
  { file: "Messenger_creation_138A1012-9DF2-4D3E-AE34-E722F004214F.jpeg", alt: "Photo 35", caption: "", date: "", note: "" },
  { file: "Messenger_creation_196A6172-F347-4AF7-A098-3A24977C8E81.jpeg", alt: "Photo 36", caption: "", date: "", note: "" },
  { file: "Messenger_creation_1C8EB35C-9DCC-4F6F-B1C9-BD33C7C379DA~2.jpeg", alt: "Photo 37", caption: "", date: "", note: "" },
  { file: "Messenger_creation_20AA54DF-206D-48DC-B250-081DE61C8CA6.jpeg", alt: "Photo 38", caption: "", date: "", note: "" },
  { file: "Messenger_creation_22FB0805-1A0F-4F61-B5AE-9DA08FD12234.jpeg", alt: "Photo 39", caption: "", date: "", note: "" },
  { file: "Messenger_creation_292653D9-16E1-42D0-A0C7-F6BE69498522.jpeg", alt: "Photo 40", caption: "", date: "", note: "" },
  { file: "Messenger_creation_2A8638DB-C65C-4C19-BFE4-3A2ACE6DEC05.jpeg", alt: "Photo 41", caption: "", date: "", note: "" },
  { file: "Messenger_creation_2B1512E1-AC1C-4B04-9BC0-AD6F72F6CA30.jpeg", alt: "Photo 42", caption: "", date: "", note: "" },
  { file: "Messenger_creation_2B7A84A1-CCE8-400D-8FD0-E4BDDA18D3EE.jpeg", alt: "Photo 43", caption: "", date: "", note: "" },
  { file: "Messenger_creation_323A73AF-0F69-4B62-9F1D-CDC6B3A6D1EF~2.jpeg", alt: "Photo 44", caption: "", date: "", note: "" },
  { file: "Messenger_creation_39DE8337-0879-4D4E-836A-039012C30B93.jpeg", alt: "Photo 45", caption: "", date: "", note: "" },
  { file: "Messenger_creation_3AA11D59-D79A-4592-A6C2-E4C3DE102CE0.jpeg", alt: "Photo 46", caption: "", date: "", note: "" },
  { file: "Messenger_creation_3DCC18AC-47CA-4670-B32D-74866DC62E2C~2.jpeg", alt: "Photo 47", caption: "", date: "", note: "" },
  { file: "Messenger_creation_3DFB4191-8EAD-449A-BC7D-C17C779E9861.jpeg", alt: "Photo 48", caption: "", date: "", note: "" },
  { file: "Messenger_creation_46864408-2C7C-4D97-AE5B-29442DB75516.jpeg", alt: "Photo 49", caption: "", date: "", note: "" },
  { file: "Messenger_creation_4B0EAA97-AEC3-4331-8674-7C5C1DA738BE.jpeg", alt: "Photo 50", caption: "", date: "", note: "" },
  { file: "Messenger_creation_4C90339F-496F-4978-B61B-63E59612BDB8~2.jpeg", alt: "Photo 51", caption: "", date: "", note: "" },
  { file: "Messenger_creation_4D955941-494C-4F4F-B588-6F8F08112482.jpeg", alt: "Photo 52", caption: "", date: "", note: "" },
  { file: "Messenger_creation_5237E7AA-DCC6-49CD-ACA4-0061B9F4BE38.jpeg", alt: "Photo 53", caption: "", date: "", note: "" },
  { file: "Messenger_creation_5313FECC-480A-46D5-A345-6827145DB148.jpeg", alt: "Photo 54", caption: "", date: "", note: "" },
  { file: "Messenger_creation_557A9635-6DA2-42D2-8F53-9F7698B4C576.jpeg", alt: "Photo 55", caption: "", date: "", note: "" },
  { file: "Messenger_creation_57AD890C-FFD0-4372-AC20-54973593AFF8.jpeg", alt: "Photo 56", caption: "", date: "", note: "" },
  { file: "Messenger_creation_599215EC-A7DD-4336-A50C-19DD83EEC4AA.jpeg", alt: "Photo 57", caption: "", date: "", note: "" },
  { file: "Messenger_creation_5B0CA0BD-3DEB-4403-BA58-A733FBBB8949~2.jpeg", alt: "Photo 58", caption: "", date: "", note: "" },
  { file: "Messenger_creation_5C2DCBB8-EE1C-4081-B7CE-32D0B30C83A6.jpeg", alt: "Photo 59", caption: "", date: "", note: "" },
  { file: "Messenger_creation_5CB152D2-E2E9-4882-ABF0-99482DAD7D1D.jpeg", alt: "Photo 60", caption: "", date: "", note: "" },
  { file: "Messenger_creation_607D746C-2E7C-4E9A-A579-02B5AF49DBDC.jpeg", alt: "Photo 61", caption: "", date: "", note: "" },
  { file: "Messenger_creation_60A88BFC-6918-42DD-A71B-B7E70CBFDBA6.jpeg", alt: "Photo 62", caption: "", date: "", note: "" },
  { file: "Messenger_creation_61409944-01A8-4B06-B5BA-DB2086E437C5.jpeg", alt: "Photo 63", caption: "", date: "", note: "" },
  { file: "Messenger_creation_673640B8-6CD0-480C-99CF-70A1C4B728F9.jpeg", alt: "Photo 64", caption: "", date: "", note: "" },
  { file: "Messenger_creation_6F877165-DF95-4A12-9D49-BC4B1BFAC49B.jpeg", alt: "Photo 65", caption: "", date: "", note: "" },
  { file: "Messenger_creation_77006B75-10A9-4BBD-8E99-7689C8470931.jpeg", alt: "Photo 66", caption: "", date: "", note: "" },
  { file: "Messenger_creation_7BD0AD32-8C47-48D7-9C42-CE42ECDC2724.jpeg", alt: "Photo 67", caption: "", date: "", note: "" },
  { file: "Messenger_creation_7EA47462-CCC9-4EBB-B71D-3CAA2BF1B1EF.jpeg", alt: "Photo 68", caption: "", date: "", note: "" },
  { file: "Messenger_creation_82DC6C97-83CA-4DCC-9AF5-EA87B032D3FC.jpeg", alt: "Photo 69", caption: "", date: "", note: "" },
  { file: "Messenger_creation_8B4D402F-2289-4DE1-B357-D41559D8F8FD.jpeg", alt: "Photo 70", caption: "", date: "", note: "" },
  { file: "Messenger_creation_8B6153E7-B68B-4DA0-971B-5DED83E7A16B.jpeg", alt: "Photo 71", caption: "", date: "", note: "" },
  { file: "Messenger_creation_95C76EF4-3C7C-4F72-9146-B0923C82868D.jpeg", alt: "Photo 72", caption: "", date: "", note: "" },
  { file: "Messenger_creation_97192297-9087-4B60-B48B-DB203F01F6E7.jpeg", alt: "Photo 73", caption: "", date: "", note: "" },
  { file: "Messenger_creation_9B0F68CC-FA42-4AF0-8621-DF54AA1092AD.jpeg", alt: "Photo 74", caption: "", date: "", note: "" },
  { file: "Messenger_creation_A8476C0C-9576-4CBB-907B-BAE12112093F.jpeg", alt: "Photo 75", caption: "", date: "", note: "" },
  { file: "Messenger_creation_A9A57EBD-8903-412D-9CAB-2D521018F8DD.jpeg", alt: "Photo 76", caption: "", date: "", note: "" },
  { file: "Messenger_creation_AF7C9F1E-245E-4102-8CF7-262CCA75D0CE.jpeg", alt: "Photo 77", caption: "", date: "", note: "" },
  { file: "Messenger_creation_B0C2A1CC-6D9F-4D2A-8345-2180B49924D9.jpeg", alt: "Photo 78", caption: "", date: "", note: "" },
  { file: "Messenger_creation_BBF742E3-F5D5-495F-8685-CEBD910C7139.jpeg", alt: "Photo 79", caption: "", date: "", note: "" },
  { file: "Messenger_creation_C4811662-258F-4A71-8177-E8A9D3654AF7~2.jpeg", alt: "Photo 80", caption: "", date: "", note: "" },
  { file: "Messenger_creation_C7568221-0296-4071-8ECC-2EAD66E8D812.jpeg", alt: "Photo 81", caption: "", date: "", note: "" },
  { file: "Messenger_creation_CAEC3812-7E6A-4F06-86C1-F7BDFD9F4DF3.jpeg", alt: "Photo 82", caption: "", date: "", note: "" },
  { file: "Messenger_creation_D2775911-E029-487A-8826-6620BFB11AAE.jpeg", alt: "Photo 83", caption: "", date: "", note: "" },
  { file: "Messenger_creation_D328DF54-6338-41AB-AE17-2BF485CA67FD~2.jpeg", alt: "Photo 84", caption: "", date: "", note: "" },
  { file: "Messenger_creation_D5439692-D15D-4315-9AFB-CCD0D1B79D42.jpeg", alt: "Photo 85", caption: "", date: "", note: "" },
  { file: "Messenger_creation_D6FB5205-2B17-4676-8022-2BF8A5942E78~2.jpeg", alt: "Photo 86", caption: "", date: "", note: "" },
  { file: "Messenger_creation_D8D433B9-DDD0-426A-AA6E-872102A142D8.jpeg", alt: "Photo 87", caption: "", date: "", note: "" },
  { file: "Messenger_creation_D9DDAABA-033A-4F77-BA2C-351136B2AE75.jpeg", alt: "Photo 88", caption: "", date: "", note: "" },
  { file: "Messenger_creation_E28816B0-FE7E-4CA2-A0C5-DBCEF65E1787.jpeg", alt: "Photo 89", caption: "", date: "", note: "" },
  { file: "Messenger_creation_E410AB06-FCD4-4358-9CA0-B0E0EB6DB70F~2.jpeg", alt: "Photo 90", caption: "", date: "", note: "" },
  { file: "Messenger_creation_F0D58214-B72F-4931-AF3F-D4EFD50DBF2C.jpeg", alt: "Photo 91", caption: "", date: "", note: "" },
  { file: "Messenger_creation_F11465D3-6C64-4F98-AAD3-C109E15FB7FE.jpeg", alt: "Photo 92", caption: "", date: "", note: "" },
  { file: "Messenger_creation_F14F7E13-1CA4-4921-B47F-0FDF08E4B25B.jpeg", alt: "Photo 93", caption: "", date: "", note: "" },
  { file: "Messenger_creation_F4D75257-395F-4C56-96B0-04CF57020CCE.jpeg", alt: "Photo 94", caption: "", date: "", note: "" },
  { file: "Messenger_creation_F4F62DCC-ECC6-4D53-B234-C40BF2AA449D.jpeg", alt: "Photo 95", caption: "", date: "", note: "" },
  { file: "Messenger_creation_F7D5A69E-5FD7-4E8A-B4CC-702A92630012~2.jpeg", alt: "Photo 96", caption: "", date: "", note: "" },
  { file: "Messenger_creation_FEEFCFD9-CDBA-462D-9914-37C9BC71D109.jpeg", alt: "Photo 97", caption: "", date: "", note: "" },
];
