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
  exercises: Exercise[];
};

export const sessions: Session[] = [
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
        targets: 'التوازن العصبي، الأربطة، الوقاية من الإصابات',
        restDurationSeconds: 10,
        setsAndReps: '3 دقائق لكل قدم (قبل النوم)'
      },
      {
        id: 'n2',
        title: 'تنفس الاستشفاء العميق',
        durationMinutes: 3,
        description: 'استلقِ بوضعية مريحة، ركز على شهيق عميق وزفير أطول لتهدئة الجهاز العصبي.',
        targets: 'الجهاز العصبي، الاستشفاء',
        restDurationSeconds: 10,
        setsAndReps: '3 دقائق متواصلة'
      },
      {
        id: 'n3',
        title: 'تحرير العضلات (Mobility)',
        durationMinutes: 4,
        description: 'حركات خفيفة لفك تشنجات العضلات بعد يوم شاق.',
        targets: 'المرونة، فك التشنجات',
        restDurationSeconds: 10,
        setsAndReps: '4 دقائق متنوعة'
      }
    ]
  },
  {
    id: 'physical_day1',
    title: 'يوم الاثنين: الانفجار والدرع الأمامي (بروتوكول التيتانيوم)',
    exercises: [
      {
        id: 't1_1',
        title: 'المشي العكسي (Reverse Walking)',
        durationMinutes: 3,
        description: 'المشي للخلف لإحماء الأوتار.',
        targets: 'إحماء أوتار الركبة',
        restDurationSeconds: 60,
        setsAndReps: '3 دقائق'
      },
      {
        id: 't1_2',
        title: 'رفع القصبة (Tibialis Raises)',
        durationMinutes: 5,
        description: 'استند للحائط وارفع أمشاط قدميك.',
        targets: 'درع الكاحل، العضلة الأمامية للساق',
        restDurationSeconds: 60,
        setsAndReps: '3 جولات × 25 تكراراً'
      },
      {
        id: 't1_3',
        title: 'رفع الأمشاط (Calf Raises)',
        durationMinutes: 4,
        description: 'رفع الكعبين للأعلى والأسفل لتقوية السمانة.',
        targets: 'السمانة، وتر العرقوب',
        restDurationSeconds: 60,
        setsAndReps: '3 جولات × 20 تكراراً'
      },
      {
        id: 't1_4',
        title: 'قفزات الصندوق (Depth Jumps)',
        durationMinutes: 6,
        description: 'القفز من صندوق والهبوط ثم القفز فوراً لأعلى.',
        targets: 'انفجار عصبي، قوة ارتدادية',
        restDurationSeconds: 90,
        setsAndReps: '4 جولات × 5 قفزات'
      },
      {
        id: 't1_5',
        title: 'سكوات القفز (Jump Squats)',
        durationMinutes: 6,
        description: 'سكوات مع قفزة انفجارية بأوزان خفيفة.',
        targets: 'القوة الانفجارية للفخذين',
        restDurationSeconds: 90,
        setsAndReps: '4 جولات × 6 تكرارات'
      },
      {
        id: 't1_6',
        title: 'القفز السريع (Pogo Jumps)',
        durationMinutes: 4,
        description: 'قفزات سريعة وقصيرة على أمشاط القدمين.',
        targets: 'نوابض الكاحل',
        restDurationSeconds: 60,
        setsAndReps: '3 جولات × 30 ثانية'
      },
      {
        id: 't1_7',
        title: 'السكوات البلغاري (Bulgarian Split Squat)',
        durationMinutes: 12,
        description: 'التمرين الملك. أثقل وزن أسمنتي، نزول بطيء في 5 ثوانٍ.',
        targets: 'القوة الغاشمة، استقرار الركبة',
        restDurationSeconds: 120,
        setsAndReps: '4 جولات × 8 تكرارات (لكل قدم)'
      },
      {
        id: 't1_8',
        title: 'الطعنات الأمامية (Walking Lunges)',
        durationMinutes: 5,
        description: 'طعنات للأمام باستخدام بار أسمنتي.',
        targets: 'قوة الفخذين، التوازن الحركي',
        restDurationSeconds: 90,
        setsAndReps: '3 جولات × 12 خطوة'
      },
      {
        id: 't1_9',
        title: 'صعود ونزول الدرجة (Step-downs)',
        durationMinutes: 7,
        description: 'نزول بطيء من درجة بوزن إضافي.',
        targets: 'ترميم الركبة، وتر الرضفة',
        restDurationSeconds: 90,
        setsAndReps: '3 جولات × 10 تكرارات'
      },
      {
        id: 't1_10',
        title: 'ضغط الصدر الأرضي (Floor Press)',
        durationMinutes: 7,
        description: 'ضغط بالدمبلز وأنت مستلقٍ على الأرض.',
        targets: 'التحام الكتف، قوة الصدر',
        restDurationSeconds: 90,
        setsAndReps: '4 جولات × 10 تكرارات'
      },
      {
        id: 't1_11',
        title: 'الضغط العلوي (Overhead Press)',
        durationMinutes: 5,
        description: 'دفع الوزن للأعلى فوق الرأس.',
        targets: 'قوة الأكتاف',
        restDurationSeconds: 90,
        setsAndReps: '3 جولات × 10 تكرارات'
      },
      {
        id: 't1_12',
        title: 'تجديف البار (Bent-over Row)',
        durationMinutes: 7,
        description: 'سحب البار للبطن مع انحناء الظهر.',
        targets: 'قوة الظهر',
        restDurationSeconds: 90,
        setsAndReps: '4 جولات × 10 تكرارات'
      },
      {
        id: 't1_13',
        title: 'الضغط الانفجاري (Plyo Push-ups)',
        durationMinutes: 4,
        description: 'تمرين ضغط مع دفع الجسم بقوة للأعلى (تصفيق إن أمكن).',
        targets: 'القوة الانفجارية للصدر والذراعين',
        restDurationSeconds: 90,
        setsAndReps: '3 جولات × 8 تكرارات'
      },
      {
        id: 't1_14',
        title: 'دوران المحور (Landmine Rotations)',
        durationMinutes: 5,
        description: 'دوران الجذع باستخدام بار مثبت من جهة واحدة.',
        targets: 'قوة الالتفاف، الكور',
        restDurationSeconds: 90,
        setsAndReps: '3 جولات × 10 لكل جهة'
      },
      {
        id: 't1_15',
        title: 'تعليق رفع الركب (Hanging Knee Raises)',
        durationMinutes: 4,
        description: 'التعلق بعقلة ورفع الركبتين للصدر.',
        targets: 'جذع سفلي، عضلات البطن',
        restDurationSeconds: 60,
        setsAndReps: '3 جولات × 15 تكراراً'
      }
    ]
  },
  {
    id: 'physical_day2',
    title: 'يوم الخميس: الفرملة والدرع الخلفي (بروتوكول التيتانيوم)',
    exercises: [
      {
        id: 't2_1',
        title: 'المشي العكسي (Reverse Walking)',
        durationMinutes: 3,
        description: 'المشي للخلف لإحماء الأوتار.',
        targets: 'إحماء أوتار الركبة',
        restDurationSeconds: 60,
        setsAndReps: '3 دقائق'
      },
      {
        id: 't2_2',
        title: 'رفع القصبة (Tibialis Raises)',
        durationMinutes: 5,
        description: 'استند للحائط وارفع أمشاط قدميك.',
        targets: 'درع الكاحل، العضلة الأمامية للساق',
        restDurationSeconds: 60,
        setsAndReps: '3 جولات × 25 تكراراً'
      },
      {
        id: 't2_3',
        title: 'رفع الأمشاط (Calf Raises)',
        durationMinutes: 4,
        description: 'رفع الكعبين للأعلى والأسفل لتقوية السمانة.',
        targets: 'السمانة، وتر العرقوب',
        restDurationSeconds: 60,
        setsAndReps: '3 جولات × 20 تكراراً'
      },
      {
        id: 't2_4',
        title: 'القفز العريض (Broad Jumps)',
        durationMinutes: 6,
        description: 'القفز للأمام لأقصى مسافة ممكنة.',
        targets: 'قوة دفع أفقية',
        restDurationSeconds: 90,
        setsAndReps: '4 جولات × 5 قفزات'
      },
      {
        id: 't2_5',
        title: 'قفزات المتزلج (Skater Jumps)',
        durationMinutes: 4,
        description: 'قفز جانبي من قدم لأخرى بوزن خفيف.',
        targets: 'تغيير الاتجاه، قوة جانبية',
        restDurationSeconds: 90,
        setsAndReps: '3 جولات × 10 تكرارات'
      },
      {
        id: 't2_6',
        title: 'خطف البار (Hang Power Clean)',
        durationMinutes: 7,
        description: 'رفع البار الأسمنتي بقوة انفجارية من مستوى الركبة للكتف.',
        targets: 'طاقة كلية، قوة انفجارية',
        restDurationSeconds: 120,
        setsAndReps: '4 جولات × 5 تكرارات'
      },
      {
        id: 't2_7',
        title: 'الرفعة الميتة الرومانية (RDL)',
        durationMinutes: 12,
        description: 'أثقل بار أسمنتي، نزول بطيء في 5 ثوانٍ مع ثني الركبة قليلاً.',
        targets: 'تأمين الصليبي، العضلات الخلفية',
        restDurationSeconds: 120,
        setsAndReps: '5 جولات × 8 تكرارات'
      },
      {
        id: 't2_8',
        title: 'توازن البندول (Single Leg RDL)',
        durationMinutes: 6,
        description: 'RDL على قدم واحدة بالدمبلز.',
        targets: 'توازن ميسي، السلسلة الخلفية',
        restDurationSeconds: 90,
        setsAndReps: '3 جولات × 8 تكرارات (لكل قدم)'
      },
      {
        id: 't2_9',
        title: 'السكوات الجانبي (Cossack Squat)',
        durationMinutes: 5,
        description: 'نزول جانبي عميق بوزن.',
        targets: 'مرونة الحوض، العضلات الضامة',
        restDurationSeconds: 90,
        setsAndReps: '3 جولات × 8 تكرارات'
      },
      {
        id: 't2_10',
        title: 'الطعنات العكسية (Reverse Lunges)',
        durationMinutes: 6,
        description: 'طعنات للخلف بدلاً من الأمام.',
        targets: 'قوة الفخذين والخلفيات',
        restDurationSeconds: 90,
        setsAndReps: '3 جولات × 10 لكل قدم'
      },
      {
        id: 't2_11',
        title: 'العقلة (Pull-ups)',
        durationMinutes: 7,
        description: 'سحب الجسم للأعلى على العقلة.',
        targets: 'صلابة الظهر',
        restDurationSeconds: 90,
        setsAndReps: '4 جولات × أقصى تكرار'
      },
      {
        id: 't2_12',
        title: 'زحلقة الخلفية (Hamstring Sliders)',
        durationMinutes: 7,
        description: 'سحب الكعبين على الأرضية أثناء الاستلقاء ورفع الحوض.',
        targets: 'ترميم الخلفيات',
        restDurationSeconds: 90,
        setsAndReps: '4 جولات × 8 تكرارات'
      },
      {
        id: 't2_13',
        title: 'بلانك كوبنهاجن (Copenhagen Plank)',
        durationMinutes: 8,
        description: 'بلانك جانبي مع وضع القدم العليا على مقعد.',
        targets: 'ممحاة إصابات الضامة',
        restDurationSeconds: 90,
        setsAndReps: '3 جولات × أقصى وقت'
      },
      {
        id: 't2_14',
        title: 'سحب المفترس (Predator Pulls)',
        durationMinutes: 5,
        description: 'سحب منخفض باستخدام العضلة الخلفية.',
        targets: 'قوة الورك، الخلفيات',
        restDurationSeconds: 90,
        setsAndReps: '3 جولات × 12 تكراراً'
      },
      {
        id: 't2_15',
        title: 'تمرين العجلة (Russian Twists)',
        durationMinutes: 4,
        description: 'دوران الجذع يميناً ويساراً مع رفع القدمين.',
        targets: 'ثبات المركز، عضلات البطن الجانبية',
        restDurationSeconds: 60,
        setsAndReps: '3 جولات × 15 تكراراً'
      }
    ]
  }
];
