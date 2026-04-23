export type Exercise = {
  id: string;
  title: string;
  durationMinutes: number;
  description: string;
  benefits?: string;
  tips?: string;
  targets: string;
  restDurationSeconds?: number;
  setsAndReps?: string;
};

export type Session = {
  id: string;
  title: string;
  description?: string;
  timeline?: { time: string; action: string; goal: string }[];
  exercises: Exercise[];
};

export const sessions: Session[] = [
  {
    id: 'golden_warmup',
    title: 'الروتين الذهبي (10 دقائق يومياً)',
    exercises: [
      {
        id: 'gw_1',
        title: 'أعظم إطالة في العالم (The World\'s Greatest Stretch)',
        durationMinutes: 2,
        description: 'وضعية الطعن (Lunge) -> كوعك للمس الأرض -> يدك للسماء -> ثم ارجع بوزنك للخلف لفرد ركبتك الأمامية (لتمديد الخلفيات).',
        benefits: 'تفتح الحوض، تمدد الخلفيات، تحرر العمود الفقري، وتفعل الكاحل.',
        targets: 'الحوض، الخلفيات، العمود الفقري',
        restDurationSeconds: 0,
        setsAndReps: '3 تكرارات لكل رجل ببطء'
      },
      {
        id: 'gw_2',
        title: 'تدفق الـ 90/90 (90/90 Flow)',
        durationMinutes: 2,
        description: 'اجلس على الأرض واجعل ركبتيك بزاوية 90 درجة. قم بتبديل الاتجاه دون استخدام يديك ببطء.',
        benefits: 'تحرر مفصل الحوض وتزيد من مدى الحركة اللازم للمراوغة والالتفاف الجسدي.',
        targets: 'مفصل الحوض',
        restDurationSeconds: 0,
        setsAndReps: 'دقيقتين متواصلة'
      },
      {
        id: 'gw_3',
        title: 'الكلب الناظر لأسفل إلى الدودة (Downward Dog to Inchworm)',
        durationMinutes: 2,
        description: 'من وضعية الوقوف، المس الأرض وامشِ بيديك حتى تصبح في وضعية الضغط، ثم ارفع حوضك للسماء، ثم عد بيديك لقدميك.',
        benefits: 'تمدد كامل للسلسلة الخلفية (السمانة + الخلفيات + الظهر)، وتقوي الكتف لتحمل الالتحامات.',
        targets: 'السلسلة الخلفية، الكتف',
        restDurationSeconds: 0,
        setsAndReps: 'دقيقتين متواصلة'
      },
      {
        id: 'gw_4',
        title: 'توازن الرجل الواحدة مع الطيران (Single Leg RDL to High Knee)',
        durationMinutes: 2,
        description: 'قف على رجل واحدة، انحنِ للأمام بظهر مستقيم كأنك تطير، وعند العودة، ارفع ركبتك بقوة لأعلى واثبت ثانية.',
        benefits: 'تفعيل الـ Hamstrings، تقوية أربطة الكاحل، وتحسين التوازن العصب حركي.',
        targets: 'Hamstrings، أربطة الكاحل، التوازن',
        restDurationSeconds: 0,
        setsAndReps: 'دقيقتين متواصلة'
      },
      {
        id: 'gw_5',
        title: 'وضعية العقرب الديناميكية (Scorpion Stretch)',
        durationMinutes: 1,
        description: 'نم على بطنك، افرد ذراعيك بجانبك، وحاول لمس يدك اليمين بقدمك اليسار من خلف ظهرك، وبالتبادل.',
        benefits: 'تفتح عضلات البطن المائلة والصدر، وتفك أي تشنج في أسفل الظهر.',
        targets: 'البطن المائلة، الصدر، أسفل الظهر',
        restDurationSeconds: 0,
        setsAndReps: 'دقيقة متواصلة'
      },
      {
        id: 'gw_6',
        title: 'الإيقاظ العصبي (Neural Wake-up)',
        durationMinutes: 1,
        description: 'قفزات سريعة جداً وقصيرة باستخدام مشط القدم فقط (Pogo Jumps)، ثم جري سريع جداً في المكان لمدة 10 ثوانٍ (Fast Feet).',
        benefits: 'ترفع سرعة رد فعل العضلات قبل أن تلمس الكرة.',
        targets: 'الجهاز العصبي، رد الفعل',
        restDurationSeconds: 0,
        setsAndReps: 'دقيقة متواصلة'
      }
    ]
  },
  {
    id: 'skills_mastery',
    title: 'الجدول المهاري النهائي (75 دقيقة)',
    exercises: [
      {
        id: 'sm_1',
        title: 'الإحماء الحسي بالكرة',
        durationMinutes: 5,
        description: 'ابدأ بتحريك الكرة بين قدميك ببطء، دحرجة بأسفل الحذاء (Sole rolls)، تنطيط خفيف، وتمريرات قصيرة جداً وهادئة مع الحائط.',
        tips: 'لا تجهد نفسك هنا، الهدف هو تدفئة سائل المفاصل (الركبة والكاحل) وإخبار جهازك العصبي أننا بدأنا العمل. تنفس بعمق.',
        benefits: 'يمنع الإصابات ويهيئ الأربطة للتمارين العنيفة القادمة.',
        targets: 'المفاصل، الجهاز العصبي، الإحماء',
        restDurationSeconds: 0,
        setsAndReps: '5 دقائق متواصلة - بدون توقف'
      },
      {
        id: 'sm_2',
        title: 'الرادار الأعمى',
        durationMinutes: 6,
        description: 'تنطيط (تكتكة) أو مراوغة عشوائية بالكرة، بشرط النظر للسماء أو لنقطة ثابتة في مستوى نظرك (ممنوع النظر للأرض تماماً).',
        tips: 'التحدي هو أن تشعر بالكرة ولا تراها. إذا سقطت، ارفع رأسك فوراً واستمر.',
        benefits: 'يوقظ المستقبلات الحسية بالكاحل، ويجعل عينك تكشف الملعب بدلاً من الانشغال بالكرة.',
        targets: 'المستقبلات الحسية، كشف الملعب',
        restDurationSeconds: 60,
        setsAndReps: '6 دقائق عمل + 1 دقيقة راحة'
      },
      {
        id: 'sm_3',
        title: 'لمسة المايكرو المغناطيسية',
        durationMinutes: 6,
        description: 'ضع 5 أحذية بمسافة "شبر" بينها. اعبر بينها بأقصى سرعة، مع لمس الكرة (باطن-ظاهر) مع كل خطوة تخطوها على الأرض.',
        tips: 'اصيح بالإيقاع "تك.. تك.. تك". لا تقفز، انزلق كالمغناطيس.',
        benefits: 'يلصق الكرة بقدمك في المساحات الضيقة جداً ويمنعها من الابتعاد ولو لسنتمتر واحد.',
        targets: 'التحكم في المساحات الضيقة، التوافق العضلي العصبي',
        restDurationSeconds: 60,
        setsAndReps: '6 دقائق عمل + 1 دقيقة راحة'
      },
      {
        id: 'sm_4',
        title: 'التركيز الدراسي الحركي',
        durationMinutes: 6,
        description: 'في مساحة 1×1 متر، أغمض عينيك تماماً وتحكم بالكرة بينما تستمع لمحاضرة دراسية (فيزياء/أحياء) عبر السماعات.',
        tips: 'ركز فعلياً على المحاضرة. إذا فقدت الكرة تحسسها بقدمك واسترجعها دون فتح عينيك.',
        benefits: 'يستهلك الفص الجبهي بالدراسة، مما يبرمج القدم على العمل التلقائي تحت أقصى تشتيت ذهني.',
        targets: 'الفص الجبهي، العمل التلقائي، التشتيت الذهني',
        restDurationSeconds: 60,
        setsAndReps: '6 دقائق عمل + 1 دقيقة راحة'
      },
      {
        id: 'sm_5',
        title: 'المهندس العصبي',
        durationMinutes: 6,
        description: 'تحكم بالكرة بقدمك (مراوغة أو تنطيط) بينما تمسك كرة تنس بيدك وترميها للحائط وتلتقطها بشكل مستمر.',
        tips: 'تركيزك البصري والذهني 100% على كرة التنس، اترك قدمك تتصرف بكرة القدم وحدها.',
        benefits: 'يفصل المحرك الإدراكي ويجعل تحكمك بالكرة "غريزة لا واعية".',
        targets: 'فصل المحرك الإدراكي، الغريزة اللاواعية',
        restDurationSeconds: 60,
        setsAndReps: '6 دقائق عمل + 1 دقيقة راحة'
      },
      {
        id: 'sm_6',
        title: 'الكروكيتا الانفجارية',
        durationMinutes: 6,
        description: 'اركض نحو قمع، وقبله بـ 10 سم انقل الكرة من باطن اليمين إلى باطن اليسار (تك-تك متصلة) وادفعها للأمام بخطوة واحدة.',
        tips: 'تخيل أن القمع هو قدم المدافع التي تنزلق لقطع الكرة. نفذ الحركة في آخر جزء من الثانية.',
        benefits: 'سرعة النقل من قدم لأخرى للهروب من المدافعين المندفعين.',
        targets: 'سرعة النقل، الهروب من الضغط',
        restDurationSeconds: 60,
        setsAndReps: '6 دقائق عمل + 1 دقيقة راحة'
      },
      {
        id: 'sm_7',
        title: 'الاستلام والهروب مع القرار الصوتي',
        durationMinutes: 6,
        description: 'ظهرك للحائط، اضرب الكرة بالكعب نحوه، استدر، اصيح (يمنى أو يسرى) أثناء عودتها، واستلم بلمسة واحدة موجهة للاتجاه الذي صرخت به.',
        tips: 'قم بمسح بصري (Scan) خلف كتفك قبل الاستلام. اللمسة الأولى يجب أن تكون هي الهروب.',
        benefits: 'يلغي التردد في منطقة الجزاء ويبرمجك على التخلص من المدافع الذي يلتصق بظهرك.',
        targets: 'سرعة القرار، التخلص من المدافع',
        restDurationSeconds: 60,
        setsAndReps: '6 دقائق عمل + 1 دقيقة راحة'
      },
      {
        id: 'sm_8',
        title: 'سقوط الكتف "وهم ميسي"',
        durationMinutes: 6,
        description: 'تقدم ببطء، انزل بحوضك واشمر كتفك وصدرك بقوة لجهة اليمين (دون لمس الكرة)، ثم ادفعها بظاهر اليسار وانفجر بالركض.',
        tips: 'العنف في رمي الكتف هو السر. اجعل المدافع يصدق أنك ستنطلق لليمين بكل قوتك.',
        benefits: 'يدمر مركز ثقل المدافع بخداع لغة الجسد فقط.',
        targets: 'تدمير مركز ثقل المدافع، لغة الجسد',
        restDurationSeconds: 60,
        setsAndReps: '6 دقائق عمل + 1 دقيقة راحة'
      },
      {
        id: 'sm_9',
        title: 'زلزال الفرملة وكسرة 90 درجة',
        durationMinutes: 6,
        description: 'اركض بأقصى سرعة مسافة 4 أمتار. اضرب "بريك" مفاجئ بأسفل الحذاء (100% إلى 0%)، انزل بحوضك، واقطع الكرة بباطن القدم بزاوية 90 للداخل.',
        tips: 'يجب أن تُسمع ضربة قدمك في الأرض عند التوقف. النزول بالحوض يشحن الانفجار.',
        benefits: 'يستغل القصور الذاتي للخصم ليسقطه أرضاً أثناء الركض.',
        targets: 'القصور الذاتي، التوقف المفاجئ',
        restDurationSeconds: 60,
        setsAndReps: '6 دقائق عمل + 1 دقيقة راحة'
      },
      {
        id: 'sm_10',
        title: 'فوضى زاوية السطح',
        durationMinutes: 6,
        description: 'سدد الكرة بعنف داخل "زاوية السطح". استقبل الارتداد العشوائي السريع وروض الكرة بلمسة واحدة (صدر، فخذ، باطن).',
        tips: 'اضرب الكرة بقوة وعشوائية. تحرك باستمرار للتعامل مع الارتداد.',
        benefits: 'يصقل رد الفعل اللحظي للتعامل مع الكرات الطائشة في المباريات.',
        targets: 'رد الفعل اللحظي، الكرات الطائشة',
        restDurationSeconds: 60,
        setsAndReps: '6 دقائق عمل + 1 دقيقة راحة'
      },
      {
        id: 'sm_11',
        title: 'لمسة اللحمية والإرهاق "The Clutch"',
        durationMinutes: 6,
        description: '10 تمارين ضغط (شناو) بسرعة جنونية، انهض فوراً وأنفاسك مقطوعة، اضرب الكرة للحائط، استلمها بفتح الحوض، ومررها بدقة. كرر العملية.',
        tips: 'لا تسمح للتعب بإفساد شكل استلامك، هذا تمرين قوة إرادة.',
        benefits: 'يضمن بقاء مهارتك حادة ومثالية حتى في الدقيقة 90 عندما ينهار الجميع بدنياً.',
        targets: 'قوة الإرادة، الأداء تحت الإرهاق',
        restDurationSeconds: 0,
        setsAndReps: '6 دقائق عمل - بدون راحة تنتهي الجلسة'
      }
    ]
  },
  {
    id: 'night_recovery',
    title: 'جلسة الاستشفاء الليلي (التوازن والتعافي)',
    exercises: [
      {
        id: 'n1',
        title: 'التوازن الليلي الاحترافي (على وسادة)',
        durationMinutes: 6,
        description: 'قف على وسادة، ارفع قدمك، أغلق عينيك. حاول الثبات. مهما سقطت، عُد للوضعية فوراً. احسب عدد السقوطات لكل قدم لتعرف قدمك الضعيفة.',
        benefits: 'يبرمج الجهاز العصبي على الثبات ويحمي الكاحل من الالتواءات المفاجئة.',
        targets: 'التوازن العصبي، الأربطة، الوقاية من الإصابات',
        restDurationSeconds: 10,
        setsAndReps: '3 دقائق لكل قدم (قبل النوم)'
      },
      {
        id: 'n2',
        title: 'تنفس الاستشفاء العميق',
        durationMinutes: 3,
        description: 'استلقِ بوضعية مريحة، ركز على شهيق عميق وزفير أطول لتهدئة الجهاز العصبي.',
        benefits: 'يخفض هرمون الكورتيزول (الهدم) ويرفع هرمونات البناء والاستشفاء العضلي.',
        targets: 'الجهاز العصبي، الاستشفاء',
        restDurationSeconds: 10,
        setsAndReps: '3 دقائق متواصلة'
      },
      {
        id: 'n3',
        title: 'تحرير العضلات (Mobility)',
        durationMinutes: 4,
        description: 'حركات خفيفة لفك تشنجات العضلات بعد يوم شاق.',
        benefits: 'يفكك العقد العضلية ويزيد من تدفق الدم المحمل بالغذاء للألياف الممزقة.',
        targets: 'المرونة، فك التشنجات',
        restDurationSeconds: 10,
        setsAndReps: '4 دقائق متنوعة'
      }
    ]
  },
  {
    id: 'physical_day1',
    title: 'البدنية (الأمامي): الانفجار والدرع الأمامي (بروتوكول التيتانيوم)',
    exercises: [
      { id: 't1_3',
        title: 'رفع الأمشاط (Calf Raises)',
        durationMinutes: 4,
        description: 'رفع الكعبين للأعلى والأسفل لتقوية السمانة.',
        benefits: 'يقوي وتر العرقوب (أخيل) ويزيد من قوة القفز والانطلاق.',
        targets: 'السمانة، وتر العرقوب',
        restDurationSeconds: 60,
        setsAndReps: '3 جولات × 20 تكراراً'
      },
      {
        id: 't1_4',
        title: 'قفزات الصندوق (Depth Jumps)',
        durationMinutes: 6,
        description: 'القفز من صندوق والهبوط ثم القفز فوراً لأعلى.',
        benefits: 'يفجر الألياف العضلية السريعة ويمنحك ارتقاءً أسطورياً في الرأسيات.',
        targets: 'انفجار عصبي، قوة ارتدادية',
        restDurationSeconds: 90,
        setsAndReps: '4 جولات × 5 قفزات'
      },
      {
        id: 't1_5',
        title: 'سكوات القفز (Jump Squats)',
        durationMinutes: 6,
        description: 'سكوات مع قفزة انفجارية بأوزان خفيفة.',
        benefits: 'يحول القوة المطلقة إلى قوة انفجارية لحظية.',
        targets: 'القوة الانفجارية للفخذين',
        restDurationSeconds: 90,
        setsAndReps: '4 جولات × 6 تكرارات'
      },
      {
        id: 't1_6',
        title: 'القفز السريع (Pogo Jumps)',
        durationMinutes: 4,
        description: 'قفزات سريعة وقصيرة على أمشاط القدمين.',
        benefits: 'يجعل كاحلك مثل الزنبرك، مما يقلل زمن ملامسة الأرض ويزيد سرعتك.',
        targets: 'نوابض الكاحل',
        restDurationSeconds: 60,
        setsAndReps: '3 جولات × 30 ثانية'
      },
      {
        id: 't1_7',
        title: 'السكوات البلغاري (Bulgarian Split Squat)',
        durationMinutes: 12,
        description: 'التمرين الملك. أثقل وزن أسمنتي، نزول بطيء في 5 ثوانٍ.',
        benefits: 'يعالج عدم التناسق بين القدمين ويبني قوة غاشمة في الالتحامات.',
        targets: 'القوة الغاشمة، استقرار الركبة',
        restDurationSeconds: 120,
        setsAndReps: '4 جولات × 8 تكرارات (لكل قدم)'
      },
      {
        id: 't1_8',
        title: 'الطعنات الأمامية (Walking Lunges)',
        durationMinutes: 5,
        description: 'طعنات للأمام باستخدام بار أسمنتي.',
        benefits: 'يحسن التوازن الحركي ويقوي العضلات المثبتة للحوض.',
        targets: 'قوة الفخذين، التوازن الحركي',
        restDurationSeconds: 90,
        setsAndReps: '3 جولات × 12 خطوة'
      },
      {
        id: 't1_9',
        title: 'صعود ونزول الدرجة (Step-downs)',
        durationMinutes: 7,
        description: 'نزول بطيء من درجة بوزن إضافي.',
        benefits: 'يرمم ركبتك ويجعلها قادرة على تحمل أوزان مضاعفة أثناء الهبوط.',
        targets: 'ترميم الركبة، وتر الرضفة',
        restDurationSeconds: 90,
        setsAndReps: '3 جولات × 10 تكرارات'
      },
      {
        id: 't1_10',
        title: 'ضغط الصدر الأرضي (Floor Press)',
        durationMinutes: 7,
        description: 'ضغط بالدمبلز وأنت مستلقٍ على الأرض.',
        benefits: 'يمنحك صلابة في الجزء العلوي للفوز بالالتحامات الكتف بالكتف.',
        targets: 'التحام الكتف، قوة الصدر',
        restDurationSeconds: 90,
        setsAndReps: '4 جولات × 10 تكرارات'
      },
      {
        id: 't1_11',
        title: 'الضغط العلوي (Overhead Press)',
        durationMinutes: 5,
        description: 'دفع الوزن للأعلى فوق الرأس.',
        benefits: 'يقوي الأكتاف ويحميك من الخلع أثناء السقوط.',
        targets: 'قوة الأكتاف',
        restDurationSeconds: 90,
        setsAndReps: '3 جولات × 10 تكرارات'
      },
      {
        id: 't1_12',
        title: 'تجديف البار (Bent-over Row)',
        durationMinutes: 7,
        description: 'سحب البار للبطن مع انحناء الظهر.',
        benefits: 'يبني ظهراً صلباً كدرع يحميك من المدافعين من الخلف.',
        targets: 'قوة الظهر',
        restDurationSeconds: 90,
        setsAndReps: '4 جولات × 10 تكرارات'
      },
      {
        id: 't1_13',
        title: 'الضغط الانفجاري (Plyo Push-ups)',
        durationMinutes: 4,
        description: 'تمرين ضغط مع دفع الجسم بقوة للأعلى (تصفيق إن أمكن).',
        benefits: 'يزيد من سرعة رد فعل الجزء العلوي في السقوط والنهوض.',
        targets: 'القوة الانفجارية للصدر والذراعين',
        restDurationSeconds: 90,
        setsAndReps: '3 جولات × 8 تكرارات'
      },
      {
        id: 't1_14',
        title: 'دوران المحور (Landmine Rotations)',
        durationMinutes: 5,
        description: 'دوران الجذع باستخدام بار مثبت من جهة واحدة.',
        benefits: 'يقوي عضلات الكور المسؤولة عن تغيير الاتجاه المفاجئ بقوة.',
        targets: 'قوة الالتفاف، الكور',
        restDurationSeconds: 90,
        setsAndReps: '3 جولات × 10 لكل جهة'
      },
      {
        id: 't1_15',
        title: 'تعليق رفع الركب (Hanging Knee Raises)',
        durationMinutes: 4,
        description: 'التعلق بعقلة ورفع الركبتين للصدر.',
        benefits: 'يبني عضلات بطن فولاذية تحمي العمود الفقري وتزيد قوة التسديد.',
        targets: 'جذع سفلي، عضلات البطن',
        restDurationSeconds: 60,
        setsAndReps: '3 جولات × 15 تكراراً'
      }
    ]
  },
  {
    id: 'physical_day2',
    title: 'البدنية (الخلفي): الفرملة والدرع الخلفي (بروتوكول التيتانيوم)',
    exercises: [
      { id: 't2_3',
        title: 'رفع الأمشاط (Calf Raises)',
        durationMinutes: 4,
        description: 'رفع الكعبين للأعلى والأسفل لتقوية السمانة.',
        benefits: 'يقوي وتر العرقوب (أخيل) ويزيد من قوة القفز والانطلاق.',
        targets: 'السمانة، وتر العرقوب',
        restDurationSeconds: 60,
        setsAndReps: '3 جولات × 20 تكراراً'
      },
      {
        id: 't2_4',
        title: 'القفز العريض (Broad Jumps)',
        durationMinutes: 6,
        description: 'القفز للأمام لأقصى مسافة ممكنة.',
        benefits: 'يطور قوة الدفع الأفقية اللازمة للانطلاقات الصاروخية (Sprint).',
        targets: 'قوة دفع أفقية',
        restDurationSeconds: 90,
        setsAndReps: '4 جولات × 5 قفزات'
      },
      {
        id: 't2_5',
        title: 'قفزات المتزلج (Skater Jumps)',
        durationMinutes: 4,
        description: 'قفز جانبي من قدم لأخرى بوزن خفيف.',
        benefits: 'يعلمك كيفية امتصاص القوة الجانبية وتغيير الاتجاه بلمح البصر.',
        targets: 'تغيير الاتجاه، قوة جانبية',
        restDurationSeconds: 90,
        setsAndReps: '3 جولات × 10 تكرارات'
      },
      {
        id: 't2_6',
        title: 'خطف البار (Hang Power Clean)',
        durationMinutes: 7,
        description: 'رفع البار الأسمنتي بقوة انفجارية من مستوى الركبة للكتف.',
        benefits: 'يعلم جسمك كيفية توليد طاقة قصوى من القدمين وحتى الأكتاف في جزء من الثانية.',
        targets: 'طاقة كلية، قوة انفجارية',
        restDurationSeconds: 120,
        setsAndReps: '4 جولات × 5 تكرارات'
      },
      {
        id: 't2_7',
        title: 'الرفعة الميتة الرومانية (RDL)',
        durationMinutes: 12,
        description: 'أثقل بار أسمنتي، نزول بطيء في 5 ثوانٍ مع ثني الركبة قليلاً.',
        benefits: 'يؤمن الرباط الصليبي ويبني خلفيات حديدية تمنع التمزقات أثناء الركض.',
        targets: 'تأمين الصليبي، العضلات الخلفية',
        restDurationSeconds: 120,
        setsAndReps: '5 جولات × 8 تكرارات'
      },
      {
        id: 't2_8',
        title: 'توازن البندول (Single Leg RDL)',
        durationMinutes: 6,
        description: 'RDL على قدم واحدة بالدمبلز.',
        benefits: 'يمنحك توازن ميسي في الالتحامات ويقوي أربطة الكاحل والركبة.',
        targets: 'توازن ميسي، السلسلة الخلفية',
        restDurationSeconds: 90,
        setsAndReps: '3 جولات × 8 تكرارات (لكل قدم)'
      },
      {
        id: 't2_10',
        title: 'الطعنات العكسية (Reverse Lunges)',
        durationMinutes: 6,
        description: 'طعنات للخلف بدلاً من الأمام.',
        benefits: 'يخفف الضغط عن الركبة ويركز العمل على العضلة الخلفية والمؤخرة.',
        targets: 'قوة الفخذين والخلفيات',
        restDurationSeconds: 90,
        setsAndReps: '3 جولات × 10 لكل قدم'
      },
      {
        id: 't2_11',
        title: 'العقلة (Pull-ups)',
        durationMinutes: 7,
        description: 'سحب الجسم للأعلى على العقلة.',
        benefits: 'يبني قوة سحب أساسية لظهر صلب ومتناسق.',
        targets: 'صلابة الظهر',
        restDurationSeconds: 90,
        setsAndReps: '4 جولات × أقصى تكرار'
      },
      {
        id: 't2_13',
        title: 'بلانك كوبنهاجن (Copenhagen Plank)',
        durationMinutes: 8,
        description: 'بلانك جانبي مع وضع القدم العليا على مقعد.',
        benefits: 'الممحاة السحرية لإصابات العضلة الضامة، يقويها بشكل خرافي.',
        targets: 'ممحاة إصابات الضامة',
        restDurationSeconds: 90,
        setsAndReps: '3 جولات × أقصى وقت'
      },
      {
        id: 't2_14',
        title: 'سحب المفترس (Predator Pulls)',
        durationMinutes: 5,
        description: 'سحب منخفض باستخدام العضلة الخلفية.',
        benefits: 'يعلمك كيفية استخدام قوة الورك في السحب والدفع.',
        targets: 'قوة الورك، الخلفيات',
        restDurationSeconds: 90,
        setsAndReps: '3 جولات × 12 تكراراً'
      },
      {
        id: 't2_15',
        title: 'تمرين العجلة (Russian Twists)',
        durationMinutes: 4,
        description: 'دوران الجذع يميناً ويساراً مع رفع القدمين.',
        benefits: 'ينحت عضلات البطن الجانبية المسؤولة عن التوازن أثناء التسديد.',
        targets: 'ثبات المركز، عضلات البطن الجانبية',
        restDurationSeconds: 60,
        setsAndReps: '3 جولات × 15 تكراراً'
      }
    ]
  },
  {
    id: 'sprint_stairs',
    title: 'جلسة السبرنت والدرج',
    exercises: [
      {
        id: 'ss_1',
        title: 'سبرنت انفجاري 20 متر',
        durationMinutes: 10,
        description: 'انطلاق بأقصى سرعة لمسافة 20 متر ثم العودة مشياً.',
        benefits: 'يبرمج الألياف العضلية السريعة على الانقباض بأقصى سرعة ممكنة.',
        targets: 'السرعة القصوى، الألياف العضلية السريعة',
        restDurationSeconds: 60,
        setsAndReps: '10 تكرارات'
      },
      {
        id: 'ss_2',
        title: 'صعود الدرج السريع',
        durationMinutes: 10,
        description: 'صعود الدرج بأقصى سرعة خطوتين بخطوتين، والنزول ببطء.',
        benefits: 'يبني تحملاً لاهوائياً جباراً وقوة انفجارية في الفخذين.',
        targets: 'قوة الفخذين، التحمل اللاهوائي',
        restDurationSeconds: 60,
        setsAndReps: '5 جولات'
      }
    ]
  },
  {
    id: 'sprint_only',
    title: 'جلسة السبرنت الانفجاري',
    exercises: [
      {
        id: 'so_1',
        title: 'سبرنت 30 متر',
        durationMinutes: 15,
        description: 'انطلاق بأقصى سرعة لمسافة 30 متر مع التركيز على حركة الذراعين.',
        benefits: 'يرفع من سرعتك القصوى (Top Speed) لتسبق أي مدافع.',
        targets: 'السرعة القصوى',
        restDurationSeconds: 90,
        setsAndReps: '10 تكرارات'
      }
    ]
  },
  {
    id: 'physical_light',
    title: 'بدنية خفيفة (سبرنتات ودرج + أوزان خفيفة)',
    exercises: [
      {
        id: 'pl_1',
        title: 'سبرنتات قصيرة 10 متر',
        durationMinutes: 5,
        description: 'انطلاقات قصيرة جداً وسريعة.',
        benefits: 'يحسن رد الفعل اللحظي والانطلاق في أول 5 أمتار.',
        targets: 'رد الفعل السريع',
        restDurationSeconds: 30,
        setsAndReps: '10 تكرارات'
      },
      {
        id: 'pl_2',
        title: 'درج خفيف',
        durationMinutes: 5,
        description: 'صعود الدرج بخطوة واحدة بإيقاع متوسط.',
        benefits: 'ينشط الدورة الدموية ويسرع من عملية الاستشفاء النشط.',
        targets: 'تنشيط الدورة الدموية',
        restDurationSeconds: 60,
        setsAndReps: '3 جولات'
      },
      {
        id: 'pl_3',
        title: 'أوزان خفيفة (جسم كامل)',
        durationMinutes: 10,
        description: 'تمارين بوزن الجسم أو دمبلز خفيفة (سكوات، ضغط، سحب) بدون الوصول للإرهاق.',
        benefits: 'يحافظ على الكتلة العضلية ويضخ الدم دون إرهاق الجهاز العصبي.',
        targets: 'الحفاظ على الكتلة العضلية، ضخ الدم',
        restDurationSeconds: 60,
        setsAndReps: 'جولتين لكل تمرين'
      }
    ]
  },
  {
    id: 'skills_light',
    title: 'مهارة خفيفة (استلام وتسليم أو 1 ضد 1)',
    exercises: [
      {
        id: 'sl_1',
        title: 'استلام وتسليم (باصات خفيفة)',
        durationMinutes: 15,
        description: 'تمرير الكرة مع الحائط أو زميل بلمسة ولمستين بدون مجهود بدني عالي.',
        benefits: 'يصقل اللمسة الأولى ويجعل التمرير دقيقاً كالساعة السويسرية.',
        targets: 'دقة التمرير، اللمسة الأولى',
        restDurationSeconds: 0,
        setsAndReps: '15 دقيقة متواصلة'
      },
      {
        id: 'sl_2',
        title: '1 ضد 1 (خفيف)',
        durationMinutes: 15,
        description: 'مراوغات خفيفة وتجربة مهارات جديدة بدون التحامات قوية.',
        benefits: 'يبني الثقة بالنفس ويطور الخيال المهاري في المواجهات الفردية.',
        targets: 'الخيال المهاري، الثقة',
        restDurationSeconds: 60,
        setsAndReps: '15 دقيقة'
      }
    ]
  },
    {
    id: 'titanium_protocol',
    title: 'بروتوكول التيتانيوم (ترميم الركبة والتزييت)',
    description: 'روتين متكامل لترميم ركبتك. نفذه قبل تمرينك الأساسي في أيام التدريب، أو كجلسة منفصلة في أيام الراحة.',
    timeline: [
      { time: 'الدقيقة 0', action: 'جرعة الوقود', goal: 'كُل ملعقة كبيرة من (الجيلي الصافي + عصرة ليمون + رشة فلفل أسود). لإرسال الكولاجين إلى مجرى الدم وتجهيزه.' },
      { time: 'الدقيقة 45', action: 'مفتاح الحرارة', goal: 'ضع كمادة ماء "حار" على ركبتك (وتر الرضفة) لمدة 15 دقيقة وأنت تراجع دروسك. لتوسيع الأوعية الدموية داخل الوتر ليكون مستعداً لامتصاص الكولاجين.' },
      { time: 'الدقيقة 60', action: 'المغناطيس (الـ 10 دقائق العظمى)', goal: 'أزل الكمادة الحارة وابدأ التمارين فوراً. لعصر الوتر وسحب الكولاجين من الدم إلى داخل التمزقات المجهرية.' },
      { time: 'الدقيقة 70', action: 'قفل الثلج', goal: 'ضع كمادة ثلج (أو ماء بارد جداً) على نفس مكان الركبة لمدة 10 دقائق. لحبس الكولاجين داخل الوتر وإطفاء أي التهاب.' }
    ],
    exercises: [
      {
        id: 'tp_1',
        title: 'المشي للخلف (Reverse Walking)',
        durationMinutes: 2,
        description: 'امشِ للخلف ببطء في مساحة غرفتك.',
        benefits: 'لضخ السائل الزليلي وتزييت المفصل.',
        targets: 'الركبة، الأوتار',
        restDurationSeconds: 0,
        setsAndReps: 'الدقيقة 1 إلى 2'
      },
      {
        id: 'tp_2',
        title: 'الجلوس على الحائط (Wall Sit)',
        durationMinutes: 3,
        description: 'انزل بزاوية 90 درجة، واغرس كعبيك بالأرض وكأنك تسحبهما للخلف.',
        benefits: 'هذا هو المغناطيس الأقوى لسحب الدم للركبة.',
        targets: 'العضلة الرباعية، الأوتار',
        restDurationSeconds: 0,
        setsAndReps: 'الدقيقة 3 إلى 5'
      },
      {
        id: 'tp_3',
        title: 'رفع قصبة الساق (Tibialis Raises)',
        durationMinutes: 2,
        description: 'استند للحائط وارفع أمشاط قدميك للأعلى.',
        benefits: 'لبناء درع الصدمات الأمامي.',
        targets: 'قصبة الساق (Tibialis Anterior)',
        restDurationSeconds: 0,
        setsAndReps: 'الدقيقة 6 إلى 7 (30-40 تكراراً)'
      },
      {
        id: 'tp_4',
        title: 'صعود باتريك العكسي (Patrick Step-Downs)',
        durationMinutes: 2,
        description: 'انزل ببطء على قدم واحدة المس الأرض بكعب القدم الأخرى واصعد.',
        benefits: 'لتشفير مسار صابونة الركبة.',
        targets: 'الركبة، العضلة الرباعية (VMO)',
        restDurationSeconds: 0,
        setsAndReps: 'الدقيقة 8 إلى 9 (15 تكراراً لكل قدم)'
      },
      {
        id: 'tp_5',
        title: 'الثبات في النورديك العكسي (Reverse Nordic Hold)',
        durationMinutes: 1,
        description: 'اجلس على ركبتيك، أرجع ظهرك المستقيم للخلف حتى تشعر بأقصى شد في فخذك وركبتك، وابقَ ثابتاً دون حركة.',
        benefits: 'لشد ولحام ألياف الكولاجين الجديدة.',
        targets: 'العضلة الرباعية، السلسلة الأمامية',
        restDurationSeconds: 0,
        setsAndReps: 'الدقيقة 10 (ثبات 60 ثانية)'
      }
    ]
  },
{
    id: 'fascia_monday',
    title: 'جلسة الفاشيا: السلسلة الخلفية والحلزونية',
    exercises: [
      {
        id: 'fm_1',
        title: 'انحناء جيفرسون (Jefferson Curl)',
        durationMinutes: 5,
        description: 'قف على صندوق صغير بوزن خفيف جداً. انزل ببطء شديد (فقرة فقرة) من رقبتك حتى أسفل ظهرك، ثم اصعد بنفس البطء. (5 ثوانٍ نزول، 5 ثوانٍ صعود).',
        benefits: 'يعيد هيكلة فاشيا الظهر بالكامل ويزيد مرونة العمود الفقري.',
        targets: 'السلسلة الخلفية، العمود الفقري',
        restDurationSeconds: 60,
        setsAndReps: '3 جولات، 5-10 تكرارات'
      },
      {
        id: 'fm_2',
        title: 'الضغط الهندوسي (Hindu Pushups)',
        durationMinutes: 5,
        description: 'ابدأ بوضعية الكلب الناظر لأسفل، انزل بصدرك مقوساً للأمام وللأعلى حتى وضعية الكوبرا، ثم عد للخلف. (5 ثوانٍ نزول، 5 ثوانٍ صعود).',
        benefits: 'يفكك تيبس الكتفين والعمود الفقري ويقوي السلسلة الحلزونية.',
        targets: 'الكتف، الصدر، العمود الفقري',
        restDurationSeconds: 60,
        setsAndReps: '3 جولات، 5-10 تكرارات'
      }
    ]
  },
  {
    id: 'fascia_thursday',
    title: 'جلسة الفاشيا: السلسلة الأمامية والجانبية',
    exercises: [
      {
        id: 'ft_1',
        title: 'النورديك العكسي (Reverse Nordic)',
        durationMinutes: 5,
        description: 'اجلس على ركبتيك، وارجع بجذعك للخلف ببطء شديد مع الحفاظ على استقامة جسمك من الركبة للرأس. (5 ثوانٍ نزول، 5 ثوانٍ صعود).',
        benefits: 'يطيل ويقوي فاشيا العضلة الرباعية ويحمي الركبة.',
        targets: 'العضلة الرباعية، السلسلة الأمامية',
        restDurationSeconds: 60,
        setsAndReps: '3 جولات، 6-8 تكرارات'
      }
    ]
  },
  {
    id: 'fascia_saturday',
    title: 'جلسة الفاشيا الشاملة (Full Reset)',
    exercises: [
      {
        id: 'fs_1',
        title: 'انحناء جيفرسون (Jefferson Curl)',
        durationMinutes: 3,
        description: 'انزل ببطء شديد (فقرة فقرة) ثم اصعد ببطء. (5 ثوانٍ نزول، 5 ثوانٍ صعود).',
        benefits: 'يعيد هيكلة فاشيا الظهر بالكامل ويزيد مرونة العمود الفقري.',
        targets: 'السلسلة الخلفية',
        restDurationSeconds: 60,
        setsAndReps: 'جولتين بتركيز فائق'
      },
      {
        id: 'fs_2',
        title: 'الضغط الهندوسي (Hindu Pushups)',
        durationMinutes: 3,
        description: 'حركة انسيابية من الكلب الناظر لأسفل إلى الكوبرا. (5 ثوانٍ نزول، 5 ثوانٍ صعود).',
        benefits: 'يفكك تيبس الكتفين والعمود الفقري ويقوي السلسلة الحلزونية.',
        targets: 'الكتف، العمود الفقري',
        restDurationSeconds: 60,
        setsAndReps: 'جولتين بتركيز فائق'
      },
      {
        id: 'fs_3',
        title: 'النورديك العكسي (Reverse Nordic)',
        durationMinutes: 3,
        description: 'ارجع بجذعك للخلف ببطء شديد من وضعية الجلوس على الركبتين. (5 ثوانٍ نزول، 5 ثوانٍ صعود).',
        benefits: 'يطيل ويقوي فاشيا العضلة الرباعية ويحمي الركبة.',
        targets: 'العضلة الرباعية',
        restDurationSeconds: 60,
        setsAndReps: 'جولتين بتركيز فائق'
      }
    ]
  },
  {
    id: 'ligament_protocol',
    title: 'تمارين الأربطة الأكثر أهمية في تاريخ كرة القدم',
    description: 'هذا هو "المانيفستو الميكانيكي" النهائي لبناء "الدرع السفلي الشامل". يُنفذ حافياً بالكامل للارتقاء بقوة الأربطة ومطاطيتها لمستوى غير مسبوق.',
    timeline: [
      { time: 'T-60 دقيقة', action: 'التهيئة الكيميائية', goal: 'شرب جرعة (الكولاجين + الليمون + فلفل أسود) لإرسال الكولاجين لمجرى الدم.' },
      { time: 'T-0 دقيقة', action: 'تجهيز البيئة', goal: 'نفذ الجدول حافياً بالكامل في غرفتك باستخدام الجدار والأرضية وإطار الباب.' }
    ],
    exercises: [
      {
        id: 'lp_1',
        title: 'دفع الجدار (Wall Calf Push) - آيزومتري',
        durationMinutes: 1,
        description: 'قف مائلاً نحو الجدار، ضع يديك عليه. ادفع الجدار للأمام بكل وزنك وقوتك كأنك تريد إسقاطه لمدة 10 ثوانٍ.',
        benefits: 'يزيد سمك وتر أخيل ويشحن الجهاز العصبي بقوة انفجارية قصوى.',
        targets: 'وتر أخيل (السمك)',
        setsAndReps: '5 جولات × 10 ثوانٍ (بأقصى قوة)',
        tips: 'ادفع بـ 100% من نيتك العصبية، كأنك تريد تحريك الجدار فعلياً.'
      },
      {
        id: 'lp_2',
        title: 'النزول السلبي (Heel Drop) - لامركزي',
        durationMinutes: 2,
        description: 'قف بأمشاطك على حافة كتاب أو عتبة. ارتفع بالقدمين، ثم ارفع قدمك السليمة وانزل بوزنك كله على قدم واحدة ببطء شديد.',
        benefits: 'يزيد من مطاطية الوتر ويحوله إلى "زنبرك" بشري يمتص ويطلق الطاقة.',
        targets: 'وتر أخيل (المطاطية)',
        setsAndReps: '3 جولات × 10 تكرارات',
        tips: 'بطء مميت: عد 5 ثوانٍ كاملة أثناء النزول حتى ينزل كعبك أسفل الحافة.'
      },
      {
        id: 'lp_3',
        title: 'غرس وسحب الكعب (Heel Dig) - آيزومتري',
        durationMinutes: 1,
        description: 'استلقِ على ظهرك، اثنِ ركبتيك قليلاً، اغرس كعبيك في الأرض واسحبهما باتجاه حوضك بأقصى قوة دون تحريكهما.',
        benefits: 'يبني سمكاً في أوتار الخلفية ويحميها من التمزقات الناتجة عن السرعة.',
        targets: 'أوتار الخلفية (السمك)',
        setsAndReps: '5 جولات × 10 ثوانٍ',
        tips: '100% أقصى قوة، تخيل أنك تريد تمزيق السجادة تحت كعبيك.'
      },
      {
        id: 'lp_4',
        title: 'الانزلاق الأرضي (Floor Sliders) - لامركزي',
        durationMinutes: 1,
        description: 'في وضعية الجسر، ارتدِ جوارب على سيراميك، ودع قدميك تنزلقان للأمام ببطء شديد وأنت تقاوم هذا الانزلاق بعضلاتك.',
        benefits: 'يقوي الأوتار في وضعية التمدد، مما يمنع الإصابات أثناء الفرملة المفاجئة.',
        targets: 'أوتار الخلفية (المطاطية)',
        setsAndReps: '3 جولات × 5 تكرارات',
        tips: 'قاوم الانزلاق للأمام ببطء شديد حتى تستقيم رجلاك تماماً.'
      },
      {
        id: 'lp_5',
        title: 'كماشة إطار الباب (Adductor Press) - آيزومتري',
        durationMinutes: 1,
        description: 'قف داخل إطار الباب، اسند باطن قدمك المصابة ضد الخشب، وادفع للداخل بأقصى قوة كأنك تريد كسر الإطار.',
        benefits: 'يبني درعاً للعضلة الضامة، وهي المنطقة الأكثر عرضة للإصابة في كرة القدم.',
        targets: 'العضلة الضامة (السمك)',
        setsAndReps: '5 جولات × 10 ثوانٍ',
        tips: 'ادفع بـ 100% من طاقتك لتقوية أوتار الحوض الداخلية.'
      },
      {
        id: 'lp_6',
        title: 'سكوات القوزاق (Cossack Squat) - حركي',
        durationMinutes: 2,
        description: 'افتح قدميك واسعاً جداً، انزل بوزنك نحو ركبة واحدة مع إبقاء الساق الأخرى مستقيمة وموجهة للأعلى.',
        benefits: 'تزييت ديناميكي لمفصل الحوض والضامة للحصول على مرونة "برازيلية".',
        targets: 'الضامة والحوض (تزييت)',
        setsAndReps: '3 جولات × 5 تكرارات',
        tips: 'نزول عميق وهادئ، كعب القدم المفرودة يلامس الأرض فقط.'
      },
      {
        id: 'lp_7',
        title: 'التوازن الأعمى (Blind Balance) - عصبي',
        durationMinutes: 1,
        description: 'قف على قدم واحدة حافياً، ارفع الركبة الأخرى، وبمجرد التوازن أغلق عينيك بقوة وقاوم الاهتزاز.',
        benefits: 'يعيد برمجة الرباط الصليبي عصبياً للتعامل مع الحركات اللاإرادية في الملعب.',
        targets: 'الرباط الصليبي (برمجة عصيبة)',
        setsAndReps: 'جولة واحدة × 60 ثانية (لكل قدم)',
        tips: 'ستشعر باهتزاز جنوني؛ هذا هو دماغك وهو يبني "الدرع العصبي". قاوم السقوط.'
      }
    ]
  }
];

export const weeklySchedule: Record<number, { title: string, sessionIds: string[] }> = {
  0: { title: 'الأحد: مهارة + بدنية + سبرنت + درج', sessionIds: ['ligament_protocol', 'titanium_protocol', 'golden_warmup', 'skills_mastery', 'physical_day1', 'sprint_stairs'] },
  1: { title: 'الاثنين: مهارة + فاشيا (خلفية)', sessionIds: ['ligament_protocol', 'titanium_protocol', 'golden_warmup', 'skills_mastery', 'fascia_monday'] },
  2: { title: 'الثلاثاء: راحة تامة (تزييت يومي فقط)', sessionIds: ['ligament_protocol', 'titanium_protocol'] },
  3: { title: 'الأربعاء: مهارة + بدنية + سبرنت', sessionIds: ['ligament_protocol', 'titanium_protocol', 'golden_warmup', 'skills_mastery', 'physical_day2', 'sprint_only'] },
  4: { title: 'الخميس: مهارة + فاشيا (أمامية)', sessionIds: ['ligament_protocol', 'titanium_protocol', 'golden_warmup', 'skills_mastery', 'fascia_thursday'] },
  5: { title: 'الجمعة: مهارة + بدنية خفيفة', sessionIds: ['ligament_protocol', 'titanium_protocol', 'golden_warmup', 'skills_mastery', 'physical_light'] },
  6: { title: 'السبت: مهارة خفيفة + فاشيا شاملة', sessionIds: ['ligament_protocol', 'titanium_protocol', 'golden_warmup', 'skills_light', 'fascia_saturday'] }
};

export const getCaloriesForSession = (sessionId: string): number => {
  switch (sessionId) {
    case 'titanium_protocol': return 100;
    case 'ligament_protocol': return 120;
    case 'golden_warmup': return 50;
    case 'skills_mastery': return 450;
    case 'physical_day1': return 350;
    case 'physical_day2': return 350;
    case 'sprint_stairs': return 200;
    case 'sprint_only': return 150;
    case 'physical_light': return 200;
    case 'skills_light': return 200;
    case 'night_recovery': return 50;
        case 'fascia_monday': return 100;
    case 'fascia_thursday': return 100;
    case 'fascia_saturday': return 120;
    default: return 100;
  }
};