<!DOCTYPE qgis PUBLIC 'http://mrcc.com/qgis.dtd' 'SYSTEM'>
<qgis version="3.28.0" styleCategories="AllStyleCategories">
  <renderer-v2 type="graduatedSymbol" attr="Score_Final" forceraster="0" enableorderby="0" symbollevels="0" graduatedMethod="GraduatedColor">
    <ranges>
      <range render="true" symbol="0" lower="60.000000" upper="70.000000" label="60 - 70"/>
      <range render="true" symbol="1" lower="70.000000" upper="80.000000" label="70 - 80"/>
      <range render="true" symbol="2" lower="80.000000" upper="100.000000" label="80 - 100"/>
    </ranges>
    <symbols>
      <symbol type="fill" name="0" alpha="1" clip_to_extent="1" force_rhr="0">
        <data_defined_properties>
          <Option type="Map">
            <Option type="QString" name="name" value=""/>
            <Option name="properties"/>
            <Option type="QString" name="type" value="collection"/>
          </Option>
        </data_defined_properties>
        <layer pass="0" class="SimpleFill" locked="0" enabled="1">
          <Option type="Map">
            <Option type="QString" name="color" value="26,150,65,200"/>
            <Option type="QString" name="outline_color" value="0,0,0,255"/>
            <Option type="QString" name="outline_style" value="solid"/>
            <Option type="QString" name="outline_width" value="2"/>
            <Option type="QString" name="outline_width_unit" value="Pixel"/>
            <Option type="QString" name="style" value="solid"/>
          </Option>
          <prop k="color" v="26,150,65,200"/>
          <prop k="outline_color" v="0,0,0,255"/>
          <prop k="outline_style" v="solid"/>
          <prop k="outline_width" v="2"/>
          <prop k="outline_width_unit" v="Pixel"/>
          <prop k="style" v="solid"/>
        </layer>
      </symbol>
      <symbol type="fill" name="1" alpha="1" clip_to_extent="1" force_rhr="0">
        <data_defined_properties>
          <Option type="Map">
            <Option type="QString" name="name" value=""/>
            <Option name="properties"/>
            <Option type="QString" name="type" value="collection"/>
          </Option>
        </data_defined_properties>
        <layer pass="0" class="SimpleFill" locked="0" enabled="1">
          <Option type="Map">
            <Option type="QString" name="color" value="26,150,65,220"/>
            <Option type="QString" name="outline_color" value="0,0,0,255"/>
            <Option type="QString" name="outline_style" value="solid"/>
            <Option type="QString" name="outline_width" value="2"/>
            <Option type="QString" name="outline_width_unit" value="Pixel"/>
            <Option type="QString" name="style" value="solid"/>
          </Option>
          <prop k="color" v="26,150,65,220"/>
          <prop k="outline_color" v="0,0,0,255"/>
          <prop k="outline_style" v="solid"/>
          <prop k="outline_width" v="2"/>
          <prop k="outline_width_unit" v="Pixel"/>
          <prop k="style" v="solid"/>
        </layer>
      </symbol>
      <symbol type="fill" name="2" alpha="1" clip_to_extent="1" force_rhr="0">
        <data_defined_properties>
          <Option type="Map">
            <Option type="QString" name="name" value=""/>
            <Option name="properties"/>
            <Option type="QString" name="type" value="collection"/>
          </Option>
        </data_defined_properties>
        <layer pass="0" class="SimpleFill" locked="0" enabled="1">
          <Option type="Map">
            <Option type="QString" name="color" value="26,150,65,255"/>
            <Option type="QString" name="outline_color" value="0,0,0,255"/>
            <Option type="QString" name="outline_style" value="solid"/>
            <Option type="QString" name="outline_width" value="2"/>
            <Option type="QString" name="outline_width_unit" value="Pixel"/>
            <Option type="QString" name="style" value="solid"/>
          </Option>
          <prop k="color" v="26,150,65,255"/>
          <prop k="outline_color" v="0,0,0,255"/>
          <prop k="outline_style" v="solid"/>
          <prop k="outline_width" v="2"/>
          <prop k="outline_width_unit" v="Pixel"/>
          <prop k="style" v="solid"/>
        </layer>
      </symbol>
    </symbols>
  </renderer-v2>
  <labeling type="simple">
    <settings calloutType="simple">
      <text-style fontFamily="Arial" fontWeight="75" fontSize="12" textColor="255,255,255,255" fontSizeUnit="Point" textOpacity="1" fontItalic="0" fontUnderline="0" fontStrikeout="0" fontLetterSpacing="0" fontWordSpacing="0" fontKerning="1" multilineHeight="1" allowHtml="0" namedStyle="Bold" fontSizeMapUnitScale="3x:0,0,0,0,0,0" fieldName="concat('Top ', coalesce(&quot;rank&quot;, to_int(&quot;Score_Final&quot;)))" isExpression="1" useSubstitutions="0" previewBkgrdColor="255,255,255,255" textOrientation="horizontal" capitalization="0" legendString="Aa" blendMode="0">
        <text-buffer bufferSize="1.5" bufferColor="0,0,0,255" bufferDraw="1" bufferSizeMapUnitScale="3x:0,0,0,0,0,0" bufferSizeUnits="MM" bufferBlendMode="0" bufferJoinStyle="128" bufferOpacity="1" bufferNoFill="0"/>
        <text-mask maskEnabled="0"/>
        <background shapeType="0" shapeDraw="0"/>
        <shadow shadowDraw="0"/>
        <dd_properties>
          <Option type="Map">
            <Option type="QString" name="name" value=""/>
            <Option name="properties"/>
            <Option type="QString" name="type" value="collection"/>
          </Option>
        </dd_properties>
      </text-style>
      <text-format decimals="3" formatNumbers="0" placeDirectionSymbol="0" plussign="0" leftDirectionSymbol="&lt;" rightDirectionSymbol=">" reverseDirectionSymbol="0" multilineAlign="3" addDirectionSymbol="0" autoWrapLength="0" wrapChar="" useMaxLineLengthForAutoWrap="1"/>
      <placement maxCurvedCharAngleIn="25" maxCurvedCharAngleOut="-25" placement="1" repeatDistance="0" repeatDistanceUnits="MM" repeatDistanceMapUnitScale="3x:0,0,0,0,0,0" dist="0" distUnits="MM" distMapUnitScale="3x:0,0,0,0,0,0" offsetType="0" centroidWhole="0" centroidInside="1" predefinedPositionOrder="TR,TL,BR,BL,R,L,TSR,BSR" fitInPolygonOnly="0" quadOffset="4" xOffset="0" yOffset="0" offsetUnits="MM" labelOffsetMapUnitScale="3x:0,0,0,0,0,0" rotationAngle="0" preserveRotation="1" priority="10" overrunDistance="0" overrunDistanceUnit="MM" overrunDistanceMapUnitScale="3x:0,0,0,0,0,0" lineAnchorPercent="0.5" lineAnchorType="0" polygonPlacementFlags="2" geometryGenerator="" geometryGeneratorEnabled="0" geometryGeneratorType="PointGeometry" layerType="PolygonGeometry"/>
      <rendering scaleVisibility="0" minScale="0" maxScale="0" fontLimitPixelSize="0" fontMinPixelSize="3" fontMaxPixelSize="10000" displayAll="1" obstacle="1" obstacleFactor="1" obstacleType="1" zIndex="0" labelPerPart="0" mergeLines="0" limitNumLabels="0" maxNumLabels="2000" upsidedownLabels="0" drawLabels="1" unplacedVisibility="0"/>
      <dd_properties>
        <Option type="Map">
          <Option type="QString" name="name" value=""/>
          <Option name="properties"/>
          <Option type="QString" name="type" value="collection"/>
        </Option>
      </dd_properties>
      <callout type="simple">
        <Option type="Map">
          <Option type="QString" name="anchorPoint" value="pole_of_inaccessibility"/>
          <Option type="QString" name="ddProperties" value=""/>
          <Option type="bool" name="enabled" value="false"/>
        </Option>
      </callout>
    </settings>
  </labeling>
  <blendMode>0</blendMode>
  <featureBlendMode>0</featureBlendMode>
  <layerOpacity>1</layerOpacity>
</qgis>

