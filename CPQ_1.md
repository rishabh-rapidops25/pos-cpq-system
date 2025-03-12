# Create Category Screen

1. Create Wood Blind Category
   fields

   1. Category name --> Wood Blinds
   2. Code --> 0235
   3. Created on --> date of creation
   4. Updated on --> Date of last update or modify
   5. Status --> Active or Inactive
   6. Category --> Description of the category

   ## Save all the fields in Category Table

2. Get All Categories from table
3. Get Category By ID
4. Update Category By ID
5. Delete Category By ID
6. Search Category with name, status or Code

## Create Component group with fields -- This group will help to group fields related to same category like Structural use, Decorative use, Optional use etc

1. Create Component group with that we will assign all our configuration option under those group
   --> Click on Component Group in that we give options to create group like below - Lift Mechanism - Structural - Tilt Control - Decorative

   ### Rest apis to create

   1. Get All Component Group from table
   2. Get Component By ID
   3. Update Component By ID
   4. Delete Component By ID
   5. Search Component with componentName

## Create Product Screen Grouping

1. Create Product Screen grouping will help to organize and group field product screen as per user need
   --> Click on Product Screen Grouping in that we give options to create single or multiple group for product screen
   - Lift Mechanism
   - Structural
   - Tilt Control
   - Decorative

## Create Segments with fields configuration will be available for products

1. Create Mount Config -- Select box from default options for Inside and Outside mount value

   1. Pre-defined Component Group select dropdown field - get all component group api
   2. Pre-defined Product Screen Grouping select dropdown field - get all product screen group api
   3. Field Name -- Choose mount
   4. Internal Name -- provide name
   5. Help Text -- field with string
   6. Sequence -- field with integer sequence - 1

   ## Select Box option for Width Config (Mount)

   - We can select mandatory option for this -- two options text or number
   - Select Text options
   - Display text field and Value field with delete option
   - Add and Clear All option for above mandatory select option
   - All need default option selection for this after creating field

   ### Save Choose Tilt Configuration

2. Create Width field Config -- Select Number input from default options to create measurement Unit

   1. Pre-defined Component Group select dropdown field - get all component group api
   2. Pre-defined Product Screen Grouping select dropdown field - get all product screen group api
   3. Field Name -- Choose mount
   4. Internal Name -- provide name
   5. Help Text -- field with string
   6. Sequence -- field with integer sequence - 2

   ## Select Box option for Width Config

   - We can select mandatory option for this -- two options text or number
   - Select Number Option
   - Unit Type Options
     1. Number Type
        - Number
        - Measurement
     2. Measurement Unit Type
        - Centimeter (cm)
        - Meters(m)
        - Inches(in)
        - Feet(ft)
   - Display Number field such as Number Type and Select Measurement option and Measurement Unit for Inches select from dropdown
   - Min Value in Integer
   - Max Value in Integer
   - After add default option selection for this after creating field by providing default value in integer
   - Clear All option for above mandatory select option

   ### Save Wood Color Config

3. Create Height field Config -- Select Number input from default options to create measurement Unit

   1. Pre-defined Component Group select dropdown field - get all component group api
   2. Pre-defined Product Screen Grouping select dropdown field - get all product screen group api
   3. Field Name -- Choose mount
   4. Internal Name -- provide name
   5. Help Text -- field with string
   6. Sequence -- field with integer sequence - 3

   ## Select Box option for Height Config (Height)

   - We can select mandatory option for this -- two options text or number
   - Select Number Option
   - Unit Type Options
     1. Number Type
        - Number
        - Measurement
     2. Measurement Unit Type
        - Centimeter (cm)
        - Meters(m)
        - Inches(in)
        - Feet(ft)
   - Display Number field such as Number Type and Select Measurement option and Measurement Unit for Inches select from dropdown
   - Min Value in Integer
   - Max Value in Integer
   - After add default option selection for this after creating field by providing default value in integer
   - Clear All option for above mandatory select option

   ### Save Height Config

4. Create Wood Color Config -- Select box from default options for wood color options

   1. Pre-defined Component Group select dropdown field - get all component group api
   2. Pre-defined Product Screen Grouping select dropdown field - get all product screen group api
   3. Field Name -- Choose wood color name
   4. Internal Name -- provide name
   5. Help Text -- field with string
   6. Sequence -- field with integer sequence - 4

   ## Select Box option for Wood Color (Wood Color)

   - We can select mandatory option for this -- two options text or number
   - Select Text options
   - Display text field and Value field with delete option
   - Add new option and Clear All option for above mandatory select option
   - Add default option selection for this after creating field

   ### Save Choose Lift Configuration

5. Create Choose Lift Config -- Select box from default options for choose lift options

   1. Pre-defined Component Group select dropdown field - get all component group api
   2. Pre-defined Product Screen Grouping select dropdown field - get all product screen group api
   3. Field Name -- choose lift name
   4. Internal Name -- provide name
   5. Help Text -- field with string
   6. Sequence -- field with integer sequence - 5

   ## Select Box option for Choose Lift (Lift)

   - We can select mandatory option for this -- two options text or number
   - Select Text options
   - Display text field and Value field with delete option
   - Add new option and Clear All option for above mandatory select option
   - Add default option selection for this after creating field

   ### Save Choose Lift Config

6. Create Choose Tilt Config -- Select check-box from default options for choose tilt options

   1. Pre-defined Component Group select dropdown field - get all component group api
   2. Pre-defined Product Screen Grouping select dropdown field - get all product screen group api
   3. Field Name -- choose lift name
   4. Internal Name -- provide name
   5. Help Text -- field with string
   6. Sequence -- field with integer sequence - 6

   ## Select Check-Box option for Choose Tilt

   - We can select mandatory option for this
   - Add display text and Value field option
   - Add default Yes option selection for this after creating field

   ### Save Mount Configuration

7. Create Slat type Config -- Select Radio button from default options for slat type options

   1. Pre-defined Component Group select dropdown field - get all component group api
   2. Pre-defined Product Screen Grouping select dropdown field - get all product screen group api
   3. Field Name -- choose lift name
   4. Internal Name -- provide name
   5. Help Text -- field with string
   6. Sequence -- field with integer sequence - 7

   ## Select Radio button option for Slat Type

   - We can select mandatory option for this
   - Display text field and Value field with delete option
   - Add new option and Clear All option for above mandatory select option
   - Add default option selection for this after creating field

   ### Save Slat Type Config

8. Create Slat Style Config -- Select Radio button from default options for slat style options

   1. Pre-defined Component Group select dropdown field - get all component group api
   2. Pre-defined Product Screen Grouping select dropdown field - get all product screen group api
   3. Field Name -- choose lift name
   4. Internal Name -- provide name
   5. Help Text -- field with string
   6. Sequence -- field with integer sequence - 8

   ## Select Radio button option for Slat Style

   - We can select mandatory option for this
   - Display text field and Value field with delete option
   - Add new option and Clear All option for above mandatory select option
   - Add default option selection for this after creating field

   ### Save Slat Style Config

9. Create Number of Blinds Config -- Select Radio button from default options for slat style options

   1. Pre-defined Component Group select dropdown field - get all component group api
   2. Pre-defined Product Screen Grouping select dropdown field - get all product screen group api
   3. Field Name -- choose lift name
   4. Internal Name -- provide name
   5. Help Text -- field with string
   6. Sequence -- field with integer sequence - 9

   ## Select Radio button option

   - We can select mandatory option for this
   - Display text field and Value field with delete option
   - Add new option and Clear All option for above mandatory select option
   - Add default option selection for this after creating field

   ### Save Example Range Selector Config

10. Example Range Selector Config -- Select Range Selection from default options for create range selection options

    1. Pre-defined Component Group select dropdown field - get all component group api
    2. Pre-defined Product Screen Grouping select dropdown field - get all product screen group api
    3. Field Name -- choose lift name
    4. Internal Name -- provide name
    5. Help Text -- field with string
    6. Sequence -- field with integer sequence - 9

    ## Select Range selection button option for Example Range Selector Config

    - We can select mandatory option for this
    - Unit Type Options
      1. Number Type
         - Number
         - Measurement
      2. Measurement Unit Type
         - Centimeter (cm)
         - Meters(m)
         - Inches(in)
         - Feet(ft)
    - Display Number field such as Number Type and Select Measurement option and Measurement Unit for Inches select from dropdown
    - Min Value in Integer
    - Max Value in Integer
    - Steps value in Integer
    - After add default option selection for this after creating field by providing default value in integer
    - Clear All option for above mandatory select option

    ### Save Mount
