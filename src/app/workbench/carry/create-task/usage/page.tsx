import { TypographyTitle, TypographyParagraph } from '@arco-design/web-react/client';

export default function UsageModal() {
  return (
    <div>
      <TypographyTitle heading={2}>软件使用免责声明</TypographyTitle>{' '}
      <TypographyParagraph>
        1.未经他人合法授权，严禁使用该软件非法采集他人店铺及商品信息（包括但不限于开通与他人相同店铺、生成商品数据包传播给其他人使用）；导致的任何责任问题，由软件使用者或者使用者单位承担，与本软件制作方和运营方无关。
      </TypographyParagraph>
      <TypographyParagraph>
        2.使用本软件应遵守平台规则，获取合法授权后再进行商品信息复制。如未经合法授权而非法获取了他人店铺数据，导致的任何责任问题，由软件使用者或使用者单位承担，与本软件制作方和运营方无关。
      </TypographyParagraph>
      <TypographyParagraph>
        3.使用本软件进行商品复制时，因不同电商平台规则不同，部分属性平台会默认填上商品信息，复制后请认真核对商品信息是否有误（包括但不限于专利号、专利类型、3C认证编号等信息），如果有误则应自行修改，避免因商品信息错误造成法律⻛险。若因没有核对商品信息真实性所造成的一切后果（包括但不限于被平台处罚、被职业打假人举报等）由软件使用者或使用者单位承担，与本软件制作方和运营方无关。
      </TypographyParagraph>
      <TypographyParagraph>
        4.请严格遵守各个电商平台的各项规章条款，因违反平台的各项规章条款所造成的一切后果（包括但不限于被平台惩罚、被职业打假人举报等）由使用者或者使用者单位自行承担；
      </TypographyParagraph>
      <TypographyParagraph>
        5.使用本软件对任何第三方造成损失（包括但不限于经济损失，知识产权侵权等）的，由软件使用者或使用者单位承担，与本软件制作方和运营方无关。
      </TypographyParagraph>
      <TypographyParagraph>
        我，作为本软件的使用者或使用者单位，已认真阅读并完全理解以上本软件制作方和运营方的免责声明，愿意遵守以上规则，使用后造成一切责任与后果由使用者本人或单位自行承担。
      </TypographyParagraph>
    </div>
  );
}
