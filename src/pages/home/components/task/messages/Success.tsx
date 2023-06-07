import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useNFTState } from 'hooks/api';
import { useStageContext } from '../Context';
import styles from '../Task.module.scss'
import { FormDefaultInput, animDuration } from '../consts';
import { CanvasAnimationProps, MintFormInputData } from '../types';



function AnimationText ({ width, height, duration }: CanvasAnimationProps) {
    const animRef = useRef<HTMLCanvasElement>(null);
    // const text = 'New NFT!'
    // New NFT! as svg path : 
    const svgPath = "M415.818 165.182V235H407.636L369.591 180.182H368.909V235H360.455V165.182H368.636L406.818 220.136H407.5V165.182H415.818ZM453.599 236.091C448.554 236.091 444.202 234.977 440.543 232.75C436.906 230.5 434.099 227.364 432.122 223.341C430.168 219.295 429.19 214.591 429.19 209.227C429.19 203.864 430.168 199.136 432.122 195.045C434.099 190.932 436.849 187.727 440.372 185.432C443.918 183.114 448.054 181.955 452.781 181.955C455.509 181.955 458.202 182.409 460.861 183.318C463.52 184.227 465.94 185.705 468.122 187.75C470.304 189.773 472.043 192.455 473.338 195.795C474.634 199.136 475.281 203.25 475.281 208.136V211.545H434.918V204.591H467.099C467.099 201.636 466.509 199 465.327 196.682C464.168 194.364 462.509 192.534 460.349 191.193C458.213 189.852 455.69 189.182 452.781 189.182C449.577 189.182 446.804 189.977 444.463 191.568C442.145 193.136 440.361 195.182 439.111 197.705C437.861 200.227 437.236 202.932 437.236 205.818V210.455C437.236 214.409 437.918 217.761 439.281 220.511C440.668 223.239 442.588 225.318 445.043 226.75C447.497 228.159 450.349 228.864 453.599 228.864C455.713 228.864 457.622 228.568 459.327 227.977C461.054 227.364 462.543 226.455 463.793 225.25C465.043 224.023 466.009 222.5 466.69 220.682L474.463 222.864C473.645 225.5 472.27 227.818 470.338 229.818C468.406 231.795 466.02 233.341 463.179 234.455C460.338 235.545 457.145 236.091 453.599 236.091ZM499.384 235L483.429 182.636H491.884L503.202 222.727H503.747L514.929 182.636H523.52L534.565 222.591H535.111L546.429 182.636H554.884L538.929 235H531.02L519.565 194.773H518.747L507.293 235H499.384ZM648.974 165.182V235H640.793L602.747 180.182H602.065V235H593.611V165.182H601.793L639.974 220.136H640.656V165.182H648.974ZM665.892 235V165.182H707.756V172.682H674.347V196.273H704.619V203.773H674.347V235H665.892ZM718.418 172.682V165.182H770.781V172.682H748.827V235H740.372V172.682H718.418ZM793.375 165.182L792.693 215.364H784.784L784.102 165.182H793.375ZM788.739 235.545C787.057 235.545 785.614 234.943 784.409 233.739C783.205 232.534 782.602 231.091 782.602 229.409C782.602 227.727 783.205 226.284 784.409 225.08C785.614 223.875 787.057 223.273 788.739 223.273C790.42 223.273 791.864 223.875 793.068 225.08C794.273 226.284 794.875 227.727 794.875 229.409C794.875 230.523 794.591 231.545 794.023 232.477C793.477 233.409 792.739 234.159 791.807 234.727C790.898 235.273 789.875 235.545 788.739 235.545Z"

    useEffect(() => {
        const canvas = animRef.current;
        if (canvas && canvas.getContext('2d')) {
            const context = canvas.getContext('2d');
            if (context) {
              const pathArr = svgPath.split(" ")

              context.fillStyle = '#141414'
              context.strokeStyle = '#141414'

              let ind = 0

              const draw = () => {

                 context.clearRect(0, 0, canvas.width, canvas.height);
                 let pathStr : string = pathArr[0]

                 ind += 1
                 for (let j = 0; j < ind; j += 1) {
                     pathStr += ` ${pathArr[j+1]}`
                 }

                 if (ind > 3) {
                    const seg = new Path2D(pathStr);
                    context.stroke(seg)
                    context.fill(seg)
                 } 

                 /* if (ind < pathArr.length - 1) {
                     requestAnimationFrame(draw)
                 } */

                 return ind
              }

              // requestAnimationFrame(draw)
              // Make animation more slow 
              const anim = setInterval(() => {
                  const index = draw() 
                  if (index >= pathArr.length - 1) {
                      clearInterval(anim)
                  }
              }, 35)
              

            }
        }

      }, [width, duration]);

    return(
        <canvas ref={animRef} width={width} height={height} />
    )
}

function SuccessMessage () {

    const { setStage } = useStageContext();
    const [displayNft, setupNft] = useState<MintFormInputData>(FormDefaultInput)
    const [isNftRead, readNft] = useState(false)
    const [animationPhase, setAnimationPhase] = useState(true) // Show animated text or NFT data
    const reader = useNFTState('all_tokens', null)

    useEffect(() => {
       setTimeout(() => {
          setAnimationPhase(false)
       }, animDuration + 1000)
    }, [])

    useEffect(() => {
         if (reader.state && !isNftRead) {
            
            const sortedState = reader.state.sort((a, b) => {

                if (a.id < b.id) return -1
                if (a.id === b.id) return 0
                if (a.id > b.id) return 1

                return 0
            })

            const nftData = sortedState[reader.state.length - 1]
            
            readNft(true)
            
            setupNft({
                name: String(nftData.name),
                description: String(nftData.description),
                media: String(nftData.media),
                reference: String(nftData.reference)
            })
        } 
    }, [reader, isNftRead])
    
    const GoBack = () => {
        setStage('input')
    }
    
    return(
        <div className={styles.msgContainer}>
          {animationPhase ? 
             <AnimationText width={1200} height={400} duration={animDuration} /> : 
             <>
               <div className={styles.pendingMessage}>
                     Your new nft : 
               </div>
               <div className={styles.nftContainer}>
                   <div className={styles.nftDtItem}>
                        {displayNft.name}
                   </div>
                   <div className={styles.nftDtItem}>
                        {displayNft.description}
                   </div>
                   <div className={styles.nftDtItem}>
                        {displayNft.media}
                   </div>
                   <div className={styles.nftDtItem}>
                        {displayNft.reference}
                   </div>
                </div>
                <button type="button" className={styles.execBtn} onClick={GoBack}>
                     Make a new NFT
                </button>
             </>
          }
        </div>
    )
}

export { SuccessMessage }